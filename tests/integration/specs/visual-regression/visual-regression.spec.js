describe('Visual regression tests', () => {
  it('should verify snapshot of every story', () => {
    expect(
      Cypress.spec.name,
      'Visual regression tests cannot run in All Specs mode because of bugs in Cypress.\nsee https://github.com/cypress-io/cypress/issues/3090.\n',
    ).not.to.equal('All Specs');

    expect(Cypress.browser.isHeadless, 'Visual regression tests cannot run in non headless mode because of Cypress.\nsee https://github.com/cypress-io/cypress/issues/3324#issuecomment-542414532').to.equal(true);

    Cypress.log({
      displayName: 'INIT',
      message: 'Obtaining all stories from storybook',
    });
    cy.visit('/');
    // wait for storybook to initialize. initialization is done when left menu is loaded
    // we can check it by waiting on menu items.
    cy.get('a[id^=explore]');

    cy.window()
      .then((win) => {
        const previewFrame = getPreviewFrame(win);
        // eslint-disable-next-line no-underscore-dangle
        const storybookStore = previewFrame.__STORYBOOK_STORY_STORE__;
        let stories = Object.values(storybookStore.getStoriesForManager());

        stories = stories.filter(isStoryEnabled);

        const storyIdFilter = Cypress.env('storyIdFilter');
        if (storyIdFilter) {
          stories = stories.filter(story => story.id.match(storyIdFilter));
        }

        Cypress.log({
          displayName: 'INIT',
          message: `${stories.length} stories found`,
          consoleProps: () => ({
            stories,
          }),
        });

        return stories;
      })
      .then((stories) => {
        for (const story of stories) {
          visitStory(getStoryUuid(story), story, null);
          const knobs = Object.entries(getStoryKnobs(story));
          for (let i = 0; i < knobs.length; i++) {
            const [name, knobsOpts] = knobs[i];
            visitStory(getStoryUuid(story, `${i}__${name}`), story, knobsOpts);
          }
        }
      });
  });
});

function visitStory(uuid, story, knobs) {
  const { waitOn, snapshotElement } = getStoryTestOptions(story);

  cy.visit(getStoryUrl(story, knobs), { log: false });
  cy.log('Creating story snapshot', story);
  cy.log(`Story: ${getStoryName(story)}`);

  setBackgroundColor(story);

  cy.get('#root:not(:empty)', { log: false });

  if (waitOn) {
    cy.get(waitOn);
  }

  cy.wait(200); // give a DOM chance to load fonts too.

  if (snapshotElement) {
    cy.get(snapshotElement).matchImageSnapshot(uuid);
  } else {
    cy.matchImageSnapshot(uuid);
  }
}

function getPreviewFrame(window) {
  return Array.prototype.find.call(window.frames, frame => /\/iframe.html/.test(frame.location.href));
}

function isStoryEnabled(story) {
  const { enabled } = getStoryTestOptions(story);
  return enabled !== false;
}

function getStoryUrl(story, knobs) {
  const knobsQuery = getKnobsQuery(knobs);
  return `/iframe.html?id=${encodeURIComponent(story.id)}&${knobsQuery}`;
}

function getStoryKnobs(story) {
  const { knobs = {} } = getStoryTestOptions(story);
  return knobs;
}

function getKnobsQuery(knobs) {
  let knobsQuery = '';
  if (knobs) {
    knobsQuery = Object.entries(knobs)
      .reduce((prev, [key, value]) => [...prev, `knob-${encodeURIComponent(key)}=${encodeURIComponent(value)}`], [])
      .join('&');
  }

  return knobsQuery;
}

function getStoryUuid(story, knobId) {
  let id = `${story.id}__${Cypress.browser.name}`;
  if (knobId != null) {
    id += `__knob-${knobId}`;
  }
  return id;
}

function getStoryTestOptions(story) {
  return (story && story.parameters && story.parameters.visualRegressionTests) || {};
}

function setBackgroundColor(story) {
  if (story.parameters && story.parameters.backgrounds) {
    const defaultBackground = story.parameters.backgrounds.find(bg => bg.default);
    if (defaultBackground && defaultBackground.value) {
      cy.window().then((win) => {
        win.document.body.style.backgroundColor = defaultBackground.value;
        cy.log(`Background color for story set to ${defaultBackground.value}`);
      });
    }
  }
}

function getStoryName(story) {
  return `${story.kind}/${story.name}`;
}
