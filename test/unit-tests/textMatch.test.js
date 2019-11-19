const expect = require('chai').expect;
let {
  openBrowser,
  goto,
  closeBrowser,
  text,
  textBox,
  toRightOf,
  evaluate,
  setConfig,
} = require('../../lib/taiko');
let {
  createHtml,
  removeFile,
  openBrowserArgs,
} = require('./test-util');
let test_name = 'textMatch';

describe('match', () => {
  let filePath;

  describe('text match', () => {
    before(async () => {
      let innerHtml = `
    <div>
        <!-- //text node exists -->
        <div>
            <div name="text_node">
                User name: <input type="text" name="uname">
            </div>
            <div name="value_or_type_of_field_as_text">
                <input type="button" value="click me">
                <input type="submit">
            </div>
            <div name="text_across_element">
                <div>Text <span>Across</span> Element</div>
            </div>
            <div id="inTop" name="text_same_as_iframe" style="display: none">
                Text in iframe
            </div>
            <iframe></iframe>
            <script>
                document.querySelector("iframe").contentDocument.write('<div id="inIframe">Text in iframe</div>');
                document.querySelector("iframe").contentDocument.close();
            </script>
            <!-- // same text node in page -->
            <div>
                <p>Sign up</p>
            </div>
            <div>
                <p>By clicking “Sign up for GitHub”</p>
            </div>
            <span>Sign up for GitHub<span>
            <!-- //text node in different tags -->
            <div>create account</div>
            <div>By clicking “create account in GitHub”</div>
            <a href="github.com">create account</a>
            <a href="github.com">create account now</a>
            <button class="button" type="submit">create account</button>
            <button class="button" type="submit">create account in GitHub</button>
            <button class="button" type="submit">
            <span> spanButton for login</span>
            </button>
            <!-- //text node with input tag -->
            <input type="text" value="password" />
            <input type="text" value="Enter password" />
            <!-- //text node with value -->
            <p>taiko demo</p>
            <input type="text" value="taiko demo" />
            <p>Enter name for taiko demo</p>
            <input type="text" value="Enter name for taiko demo" />
            <!-- //text node with type -->
            <p>this is text</p>
            <input type="text" value="user name" />
            <p>Enter user name in textbox</p>
            <input type="text" value="Enter user name" />
        </div>
        <div >
            <h1>Elements visibility</h1>
            <div>
                <p>Visible content</p>
            </div>
            <div style="display:none">
                <p>Parent element has display none</p>
            </div>
            <div>
                <p style="display:none">Element it self has display none</p>
            </div>
            <div style="display:inline">
                <p>
                    With 'display: inline', the width, height,
                    margin-top, margin-bottom, and float properties have no effect.
                    Hence, element.offsetHeight and element.offsetWidt are zero(0).
                </p>
                Element with display inline should be invisible
            </div>
            <div>
            </div>
        </div>
        <div>someNode</div>
    </div>
            `;
      filePath = createHtml(innerHtml, test_name);
      await openBrowser(openBrowserArgs);
      await goto(filePath);
      setConfig({ waitForNavigation: false });
    });
    after(async () => {
      setConfig({ waitForNavigation: true });
      await closeBrowser();
      removeFile(filePath);
    });

    describe('text node', () => {
      it('test exact match exists()', async () => {
        expect(await text('User name:').exists()).to.be.true;
        expect(await text('user name:').exists()).to.be.true;
      });

      it('test exact match get()', async () => {
        expect(await text('User name:').get()).to.have.lengthOf(1);
      });

      it('test exact match description', async () => {
        expect(text('User name:').description).to.be.eql(
          'Element with text "User name:"',
        );
      });

      it('test partial match exists()', async () => {
        expect(await text('User').exists()).to.be.true;
      });

      it('test partial match get()', async () => {
        expect(await text('User').get()).to.have.lengthOf(4);
      });

      it('test partial match description', async () => {
        expect(text('User').description).to.be.eql(
          'Element with text "User"',
        );
      });

      it('test proximity selector', async () => {
        expect(await textBox(toRightOf('User name:')).exists()).to.be
          .true;
      });
    });

    describe('value or type of field as text', () => {
      it('test value as text exists()', async () => {
        expect(await text('click me').exists()).to.be.true;
      });

      it('test value as text get()', async () => {
        expect(await text('click me').get()).to.have.lengthOf(1);
      });

      it('test value as text description', async () => {
        expect(text('click me').description).to.be.eql(
          'Element with text "click me"',
        );
      });

      it('test type as text exists()', async () => {
        expect(await text('submit').exists()).to.be.true;
      });

      it('test type as text get()', async () => {
        expect(await text('submit').get()).to.have.lengthOf(4);
      });

      it('test type as text description', async () => {
        expect(text('submit').description).to.be.eql(
          'Element with text "submit"',
        );
      });
    });

    describe('text across element', () => {
      it('test exact match exists()', async () => {
        expect(await text('Text Across Element').exists()).to.be.true;
      });

      it('test exact match get()', async () => {
        expect(
          await text('Text Across Element').get(),
        ).to.have.lengthOf(1);
      });

      it('test exact match description', async () => {
        expect(text('Text Across Element').description).to.be.eql(
          'Element with text "Text Across Element"',
        );
      });

      it('test partial match exists()', async () => {
        expect(await text('Text').exists()).to.be.true;
      });

      it('test partial match get()', async () => {
        expect(await text('Text').get()).to.have.lengthOf(8);
      });

      it('test partial match description', async () => {
        expect(text('Text').description).to.be.eql(
          'Element with text "Text"',
        );
      });
    });
    describe('match text in different tags', () => {
      it('test exact match for text in multiple elememts', async () => {
        expect(await text('create account').exists()).to.be.true;
        expect(await text('create account').get()).to.have.lengthOf(
          3,
        );
        expect(text('create account').description).to.be.eql(
          'Element with text "create account"',
        );
      });
      it('test contains match for text in multiple elements', async () => {
        expect(await text('account').exists()).to.be.true;
        expect(await text('account').get()).to.have.lengthOf(6);
        expect(text('account').description).to.be.eql(
          'Element with text "account"',
        );
      });
    });
    describe('match text as value in input field', () => {
      it('test exact match for value in input', async () => {
        expect(await text('password').exists()).to.be.true;
        expect(await text('password').get()).to.have.lengthOf(1);
        expect(text('password').description).to.be.eql(
          'Element with text "password"',
        );
      });
      it('test contains match for value in input', async () => {
        expect(await text('pass').exists()).to.be.true;
        expect(await text('pass').get()).to.have.lengthOf(2);
        expect(text('pass').description).to.be.eql(
          'Element with text "pass"',
        );
      });
    });
    describe('match text for value and paragraph', () => {
      it('test exact match for value and text', async () => {
        expect(await text('taiko demo').exists()).to.be.true;
        expect(await text('taiko demo').get()).to.have.lengthOf(2);
        expect(text('taiko demo').description).to.be.eql(
          'Element with text "taiko demo"',
        );
      });
      it('test contains match for value and text', async () => {
        expect(await text('demo').exists()).to.be.true;
        expect(await text('demo').get()).to.have.lengthOf(4);
        expect(text('demo').description).to.be.eql(
          'Element with text "demo"',
        );
      });
    });
    describe('match text for type and paragraph', () => {
      it('test exact match for type', async () => {
        expect(await text('text').exists()).to.be.true;
        expect(await text('text').get()).to.have.lengthOf(8);
        expect(text('text').description).to.be.eql(
          'Element with text "text"',
        );
      });
      it('test contains match for type and text', async () => {
        expect(await text('tex').exists()).to.be.true;
        expect(await text('tex').get()).to.have.lengthOf(11);
        expect(text('tex').description).to.be.eql(
          'Element with text "tex"',
        );
      });
    });

    describe('text in iframe should be matched if match in top is invisible', () => {
      it('test text exists()', async () => {
        expect(await text('Text in iframe').exists()).to.be.true;
      });

      it('test text get()', async () => {
        expect(await text('Text in iframe').get()).to.have.lengthOf(
          1,
        );
      });

      it('test text description', async () => {
        expect(text('Text in iframe').description).to.be.eql(
          'Element with text "Text in iframe"',
        );
      });

      it('test text is from iframe', async () => {
        const id = await evaluate(text('Text in iframe'), elem => {
          return elem.parentElement.id;
        });
        expect(id).to.equal('inIframe');
      });
    });
    describe('match text in multiple paragraph', () => {
      it('test exact match for text', async () => {
        expect(await text('Sign up').exists()).to.be.true;
        expect(await text('Sign up').get()).to.have.lengthOf(1);
        expect(text('Sign up').description).to.be.eql(
          'Element with text "Sign up"',
        );
      });
      it('test contains match for text', async () => {
        expect(await text('Sign').exists()).to.be.true;
        expect(await text('Sign').get()).to.have.lengthOf(3);
        expect(text('Sign').description).to.be.eql(
          'Element with text "Sign"',
        );
      });
    });
    describe('match text in different tags', () => {
      it('test exact match for text in multiple elememts', async () => {
        expect(await text('create account').exists()).to.be.true;
        expect(await text('create account').get()).to.have.lengthOf(
          3,
        );
        expect(text('create account').description).to.be.eql(
          'Element with text "create account"',
        );
      });
      it('test contains match for text in multiple elements', async () => {
        expect(await text('account').exists()).to.be.true;
        expect(await text('account').get()).to.have.lengthOf(6);
        expect(text('account').description).to.be.eql(
          'Element with text "account"',
        );
      });
    });
    describe('match text as value in input field', () => {
      it('test exact match for value in input', async () => {
        expect(await text('password').exists()).to.be.true;
        expect(await text('password').get()).to.have.lengthOf(1);
        expect(text('password').description).to.be.eql(
          'Element with text "password"',
        );
      });
      it('test contains match for value in input', async () => {
        expect(await text('pass').exists()).to.be.true;
        expect(await text('pass').get()).to.have.lengthOf(2);
        expect(text('pass').description).to.be.eql(
          'Element with text "pass"',
        );
      });
    });
    describe('match text for value and paragraph', () => {
      it('test exact match for value and text', async () => {
        expect(await text('taiko demo').exists()).to.be.true;
        expect(await text('taiko demo').get()).to.have.lengthOf(2);
        expect(text('taiko demo').description).to.be.eql(
          'Element with text "taiko demo"',
        );
      });
      it('test contains match for value and text', async () => {
        expect(await text('demo').exists()).to.be.true;
        expect(await text('demo').get()).to.have.lengthOf(4);
        expect(text('demo').description).to.be.eql(
          'Element with text "demo"',
        );
      });
    });
    describe('match text for type and paragraph', () => {
      it('test exact match for type', async () => {
        expect(await text('text').exists()).to.be.true;
        expect(await text('text').get()).to.have.lengthOf(8);
        expect(text('text').description).to.be.eql(
          'Element with text "text"',
        );
      });
      it('test contains match for type and text', async () => {
        expect(await text('tex').exists()).to.be.true;
        expect(await text('tex').get()).to.have.lengthOf(11);
        expect(text('tex').description).to.be.eql(
          'Element with text "tex"',
        );
      });
    });

    describe('Text visibility', () => {
      it('text should be visible', async () => {
        expect(await text('Visible content').exists()).to.be.true;
      });

      it('text should not be visible when display is set to none', async () => {
        const exists = await text(
          'Element it self has display none',
        ).exists();
        expect(exists).to.be.false;
      });

      it('text should not be visible when parent element display is set to none', async () => {
        const exists = await text(
          'Parent element has display none',
        ).exists();
        expect(exists).to.be.false;
      });

      it('text should be visible when ', async () => {
        expect(
          await text(
            'Element with display inline should be invisible',
          ).exists(),
        ).to.be.true;
      });
    });

    describe('elements()', () => {
      it('test get of elements', async () => {
        const elements = await text('someNode').elements();
        expect(await elements[0].get()).to.be.a('number');
      });

      it('test exists of elements', async () => {
        let elements = await text('someNode').elements();
        expect(await elements[0].exists()).to.be.true;
        expect(await text('someTextBox').exists()).to.be.false;
      });

      it('test description of elements', async () => {
        let elements = await text('someNode').elements();
        expect(elements[0].description).to.be.eql(
          'Element with text "someNode"',
        );
      });
    });

    describe('text match in child element', () => {
      it('should match the text in child element', async () => {
        expect(await text('spanButton for login').exists()).to.be
          .true;
      });
    });
  });
});
