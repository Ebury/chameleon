/* eslint-disable react/jsx-one-expression-per-line, jsx-a11y/anchor-is-valid, jsx-a11y/control-has-associated-label, react/button-has-type */
import type { Meta, StoryFn } from '@storybook/vue3';

import './elements.story.css';

const meta: Meta = {
  title: 'CSS/Elements',
};

export default meta;

export const all: StoryFn = () => ({
  render() {
    const contentSectioning = ['address', 'article', 'aside', 'footer', 'header', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hgroup', 'main', 'nav', 'section'];
    const textContent = ['blockquote', 'dl', 'dt', 'dd', 'dir', 'div', 'figcaption', 'figure', <hr />, 'main', 'p', 'pre'];
    const lists = [
      <ol><li>Item 1</li><li>Item 2</li><li>Item 3</li><ol><li>Nested Item 1</li><li>Nested Item 2</li><li>Nested Item 3</li></ol><li>Item 4</li></ol>,
      <ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><ul><li>Nested Item 1</li><li>Nested Item 2</li><li>Nested Item 3</li></ul><li>Item 4</li></ul>,
    ];
    const inlineContent = [<a href="#">a with href</a>, <a>a without href</a>, 'abbr', 'b', 'bdi', 'bdo', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'tt', 'u', 'var', 'wbr'];
    const multimedia = [<div><img src="/ebury-chameleon-logo.png" alt="image with src" /></div>, <img src="" alt="broken image" />];
    const demarcatingEdits = ['del', 'ins'];

    return (
      <div class="tw-p-16 tw-max-w-screen-md tw-m-auto ec-elements-story">
        <div>The list of elements based on <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element">MDN</a>. Some elements where omitted because they are on the edge of usefulness.</div>

        <h2 class="ec-elements-story__heading">Content sectioning</h2>
        { contentSectioning.map(renderElement) }
        <h2 class="ec-elements-story__heading">Text content</h2>
        { textContent.map(renderElement) }
        <h2 class="ec-elements-story__heading">Lists</h2>
        { lists.map(renderElement) }
        <h2 class="ec-elements-story__heading">Inline content</h2>
        { inlineContent.map(renderElement) }
        <h2 class="ec-elements-story__heading">Multimedia</h2>
        { multimedia.map(renderElement) }
        <h2 class="ec-elements-story__heading">Demarcating edits</h2>
        { demarcatingEdits.map(renderElement) }
        <h2 class="ec-elements-story__heading">Table</h2>
        { renderTable() }
        <h2 class="ec-elements-story__heading">Forms</h2>
        { renderForm() }
        <h2 class="ec-elements-story__heading">Interactive elements</h2>
        { renderInteractiveElements() }
      </div>
    );

    function renderElement(element: string | JSX.Element): JSX.Element {
      if (typeof element === 'string') {
        return (
          <element>{ element }</element>
        );
      }
      return (element);
    }

    function renderTable(): JSX.Element {
      return (
        <table>
          <caption>Caption</caption>
          <thead>
            <tr>
              <th scope="col" />
              <th scope="col">Column 1</th>
              <th scope="col">Column 2</th>
              <th scope="col">Column 3</th>
            </tr>
          </thead>
          <tbody>
            <tr><th scope="row">Row 1</th><td>Data 1</td><td>Data 2</td><td>Data 3</td></tr>
            <tr><th scope="row">Row 2</th><td>Data 1</td><td>Data 2</td><td>Data 3</td></tr>
          </tbody>
          <tfoot>
            <tr><th scope="row">Footer</th><td>Total 1</td><td>Total 2</td><td>Total 3</td></tr>
          </tfoot>
        </table>
      );
    }

    function renderForm(): JSX.Element {
      return (
        <form>
          <div>
            <label for="progress">Progress:</label>
            <progress id="progress" max="100" value="50">50%</progress>
          </div>
          <div>
            <label for="meter">Meter:</label>
            <meter id="meter" min="0" max="100" low="33" high="66" optimum="80" value="50">50%</meter>
          </div>
          <div>
            <label for="input-with-datalist">Input with datalist:</label>
            <input id="input-with-datalist" list="custom-datalist" />
            <datalist id="custom-datalist">
              <option value="option-1">Option 1</option>
              <option value="option-2">Option 2</option>
            </datalist>
          </div>
          <fieldset>
            <legend>Legend of the fieldset</legend>
            Fieldset content
          </fieldset>
          <div>
            <output>Output: 100%</output>
          </div>
          {
            ['checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'month', 'number', 'password', 'radio', 'range', 'search', 'tel', 'text', 'time', 'url', 'week'].map(type => (
              <div>
                <label for={`input-of-type-${type}`}>Input with type {type}:</label>
                <input type={type} id={`input-of-type-${type}`} />
              </div>
            ))
          }
          <div>
            <label for="select">Select:</label>
            <select id="select">
              <option value="option-1">Option 1</option>
              <option value="option-2">Option 2</option>
            </select>
          </div>
          <div>
            <label for="select-with-groups">Select with groups:</label>
            <select id="select-with-groups">
              <optgroup label="Group 1">
                <option value="option-1">Option 1</option>
                <option value="option-2">Option 2</option>
              </optgroup>
              <optgroup label="Group 1">
                <option value="option-1">Option 1</option>
                <option value="option-2">Option 2</option>
              </optgroup>
            </select>
          </div>
          <div>
            <label for="textarea">Textarea:</label>
            <textarea id="textarea" />
          </div>
          <div>
            <button type="button">Button</button>
            <button type="submit">Submit button</button>
            <button type="reset">Reset button</button>
          </div>
        </form>
      );
    }

    function renderInteractiveElements(): JSX.Element {
      return (
        <details>
          <summary>Details</summary>
          Details and summary
        </details>
      );
    }
  },
});

all.parameters = {
  controls: { disable: true },
  actions: { disable: true },
};
