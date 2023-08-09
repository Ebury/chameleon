describe('Visual regression tests', () => {
  it('should verify snapshot of every story', () => {
    // The ResizeObserver exception doesn't affect the test
    // results but can cause test to break
    Cypress.on('uncaught:exception', err => !err.message.includes('ResizeObserver'));

    expect(
      Cypress.spec.name,
      'Visual regression tests cannot run in All Specs mode because of bugs in Cypress.\nsee https://github.com/cypress-io/cypress/issues/3090.\n',
    ).not.to.equal('All Specs');

    // expect(Cypress.browser.isHeadless, 'Visual regression tests cannot run in non headless mode because of Cypress.\nsee https://github.com/cypress-io/cypress/issues/3324#issuecomment-542414532').to.equal(true);

    Cypress.log({
      displayName: 'INIT',
      message: 'Obtaining all stories from storybook',
    });
    cy.visit('/');
    // wait for storybook to initialize. initialization is done when left menu is loaded
    // we can check it by waiting on menu items.
    cy.get('a.sidebar-item');

    cy.window()
      .then({ timeout: 30000 }, async (win) => {
        const previewFrame = getPreviewFrame(win);
        // eslint-disable-next-line no-underscore-dangle
        const storybookStore = previewFrame.__STORYBOOK_STORY_STORE__;

        // getStoriesJsonData() use extract() internally. In Story Store V7 the
        // extract function needs the cacheAllCSFFiles function to be called
        // before it asynchronously.
        // More info here: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#v7-store-api-changes-for-addon-authors
        await storybookStore.cacheAllCSFFiles();
        let stories = Object.values(storybookStore.getStoriesJsonData().stories);

        const storyIdFilter = 'option-card';
        if (storyIdFilter) {
          stories = stories.filter(story => story.id.match(storyIdFilter));
        }

        stories = stories.map(story => storybookStore.fromId(story.id)).filter(isStoryEnabled);

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
          const controls = Object.entries(getStoryControls(story));
          for (let i = 0; i < controls.length; i++) {
            const [name, controlsOpts] = controls[i];
            cy.log(name);
            visitStory(getStoryUuid(story, `${i}__${name}`), story, controlsOpts);
          }
        }
      });
  });
});

function visitStory(uuid, story, controls) {
  const { waitOn, snapshotElement } = getStoryTestOptions(story);

  cy.visit(getStoryUrl(story, controls), { log: false });
  cy.log('Creating story snapshot', story);
  cy.log(`Story: ${getStoryName(story)}`);

  setBackgroundColor(story);

  if (waitOn) {
    cy.get(waitOn);
  } else {
    cy.get('body.sb-show-main');
  }

  // give a DOM chance to load fonts too.
  cy.window().then({
    timeout: 120000,
  }, win => new Cypress.Promise(resolve => win.requestIdleCallback(resolve)));

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
  const { disable } = getStoryTestOptions(story);
  const { docsOnly } = story.parameters;
  return disable !== true && !docsOnly;
}

function getStoryUrl(story, controls) {
  let url = `/iframe.html?id=${encodeURIComponent(story.id)}`;
  const controlsQuery = getControlsQuery(controls);
  if (controlsQuery) {
    url += `&args=${controlsQuery}`;
  }
  return url;
}

function getStoryControls(story) {
  const { controls = {} } = getStoryTestOptions(story);
  return controls;
}

// args=size:49;transparent:true;user.name:demo1
function getControlsQuery(controls) {
  let controlsQuery = '';
  if (controls) {
    controlsQuery = Object.entries(controls)
      .reduce((prev, [key, value]) => [...prev, `${encodeURIComponent(key)}:${encodeURIComponent(value)}`], [])
      .join(';');
  }

  return controlsQuery;
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
    const defaultBackground = story.parameters.backgrounds.values.find(bg => bg.name === story.parameters.backgrounds.default);
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
