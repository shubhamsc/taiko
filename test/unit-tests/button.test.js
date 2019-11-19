const expect = require('chai').expect;
let {
  openBrowser,
  goto,
  closeBrowser,
  button,
  setConfig,
} = require('../../lib/taiko');
let {
  createHtml,
  removeFile,
  openBrowserArgs,
} = require('./test-util');
const test_name = 'button';

describe(test_name, () => {
  let filePath;
  before(async () => {
    let innerHtml =
      '<div name="inline button text">' +
      '<button type="button">Click</button>' +
      '<input type="button" value="Input Button" />' +
      '<input type="reset" value="Input Reset" />' +
      '<input type="submit" value="Input Submit" />' +
      '<input type="image" value="Input Image" />' +
      '</div>' +
      '<div name="button in label">' +
      '<label><input type="button" value="inputButtonInLabel" /><span>InputButtonInLabel</span></label>' +
      '<label><input type="reset" /><span>ResetInLabel</span></label>' +
      '<label><input type="submit" /><span>SubmitInLabel</span></label>' +
      '<label><input type="image" /><span>ImageInLabel</span></label>' +
      '</div>' +
      '<div name="button in label for">' +
      '<label for="inputButton" >LabelForButton</label> <input type="button" id="inputButton" />' +
      '<label for="inputReset" >LabelForReset</label> <input type="reset" id="inputReset" />' +
      '<label for="inputSubmit" >LabelForSubmit</label> <input type="submit" id="inputSubmit" />' +
      '<label for="inputImage" >LabelForImage</label> <input type="image" id="inputImage" />' +
      '</div>' +
      '<div name="button with Hidden Attribute">' +
      '<button type="button" style="display:none">HiddenButton</button>' +
      '<input type="reset" style="display:none" value="Input Hidden Reset" />' +
      '<input type="submit" style="display:none" value="Input Hidden Submit" />' +
      '</div>' +
      '<div name="button with Hidden Attribute">' +
      '<button type="button" style="display:none">HiddenButton</button>' +
      '<input type="reset" style="display:none" value="Input Hidden Reset" />' +
      '<input type="submit" style="display:none" value="Input Hidden Submit" />' +
      '</div>' +
      '<button type="button">similarButton1</button>' +
      '<button type="button">similarButton2</button>' +
      '<button type="button">similarButton3</button>' +
      //button tag with wrapped elements
      '<button><span> spanButton </span></button>' +
      '<button><strong>strongButton</strong></button>' +
      '<button><i>italicButton</i></button>' +
      '<button><b>boldButton</b>></button>' +
      '<button>' +
      '<div>childElementButton</div>' +
      '</button>';

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
  describe('button test', () => {
    describe('normal button', () => {
      it('button exists()', async () => {
        expect(await button('Click').exists()).to.be.true;
        expect(await button('Input Button').exists()).to.be.true;
        expect(await button('Input Reset').exists()).to.be.true;
        expect(await button('Input Submit').exists()).to.be.true;
        expect(await button('Input Image').exists()).to.be.true;
      });

      it('button elements()', async () => {
        expect(await button('Click').elements()).to.have.lengthOf(1);
        expect(
          await button('Input Button').elements(),
        ).to.have.lengthOf(1);
        expect(
          await button('Input Reset').elements(),
        ).to.have.lengthOf(1);
        expect(
          await button('Input Submit').elements(),
        ).to.have.lengthOf(1);
      });

      it('button description', async () => {
        expect(button('Click').description).to.be.eql(
          'Button with label Click ',
        );
        expect(button('Input Button').description).to.be.eql(
          'Button with label Input Button ',
        );
        expect(button('Input Reset').description).to.be.eql(
          'Button with label Input Reset ',
        );
        expect(button('Input Submit').description).to.be.eql(
          'Button with label Input Submit ',
        );
        expect(button('Input Image').description).to.be.eql(
          'Button with label Input Image ',
        );
      });

      xit('button text()', async () => {
        expect(await button('Click').text()).to.be.eql('Click');
        expect(await button('Input Button').text()).to.be.eql(
          'Input Button',
        );
        expect(await button('Input Reset').text()).to.be.eql(
          'Input Reset',
        );
        expect(await button('Input Submit').text()).to.be.eql(
          'Input Submit',
        );
        expect(await button('Input Image').text()).to.be.eql(
          'Input Image',
        );
      }); // Todo: should be fixed with #815
    });
    describe('button with label', () => {
      it('exists with label()', async () => {
        expect(await button('InputButtonInLabel').exists()).to.be
          .true;
        expect(await button('ResetInLabel').exists()).to.be.true;
        expect(await button('SubmitInLabel').exists()).to.be.true;
        expect(await button('ImageInLabel').exists()).to.be.true;
      });

      it('get with label()', async () => {
        expect(
          await button('InputButtonInLabel').get(),
        ).to.have.lengthOf(1);
        expect(await button('ResetInLabel').get()).to.have.lengthOf(
          1,
        );
        expect(await button('SubmitInLabel').get()).to.have.lengthOf(
          1,
        );
      });

      it('button description', async () => {
        expect(button('InputButtonInLabel').description).to.be.eql(
          'Button with label InputButtonInLabel ',
        );
        expect(button('ResetInLabel').description).to.be.eql(
          'Button with label ResetInLabel ',
        );
        expect(button('SubmitInLabel').description).to.be.eql(
          'Button with label SubmitInLabel ',
        );
        expect(button('ImageInLabel').description).to.be.eql(
          'Button with label ImageInLabel ',
        );
      });

      xit('text with label()', async () => {
        expect(await button('InputButtonInLabel').text()).to.be.eql(
          'inputButtonInLabel',
        );
        expect(await button('ResetInLabel').text()).to.be.eql(
          'resetInLabel',
        );
        expect(await button('SubmitInLabel').text()).to.be.eql(
          'submitInLabel',
        );
        expect(await button('ImageInLabel').text()).to.be.eql(
          'imageInLabel',
        );
      }); // Todo: should be fixed with #815
    });
    describe('button with label for', () => {
      it('test exists with label for()', async () => {
        expect(await button('LabelForButton').exists()).to.be.true;
        expect(await button('LabelForReset').exists()).to.be.true;
        expect(await button('LabelForSubmit').exists()).to.be.true;
        expect(await button('LabelForImage').exists()).to.be.true;
      });

      it('test get with label for()', async () => {
        expect(await button('LabelForButton').get()).to.have.lengthOf(
          1,
        );
        expect(await button('LabelForReset').get()).to.have.lengthOf(
          1,
        );
        expect(await button('LabelForSubmit').get()).to.have.lengthOf(
          1,
        );
      });

      it('button description', async () => {
        expect(button('LabelForButton').description).to.be.eql(
          'Button with label LabelForButton ',
        );
        expect(button('LabelForReset').description).to.be.eql(
          'Button with label LabelForReset ',
        );
        expect(button('LabelForSubmit').description).to.be.eql(
          'Button with label LabelForSubmit ',
        );
        expect(button('LabelForImage').description).to.be.eql(
          'Button with label LabelForImage ',
        );
      });

      xit('test text with label for()', async () => {
        expect(await button('LabelForButton').text()).to.be.eql(
          'LabelForButton',
        );
        expect(await button('LabelForReset').text()).to.be.eql(
          'LabelForButton',
        );
        expect(await button('LabelForSubmit').text()).to.be.eql(
          'LabelForButton',
        );
        expect(await button('LabelForImage').text()).to.be.eql(
          'LabelForImage',
        );
      }); // Todo: should be fixed with #815
    });

    describe('elements()', () => {
      it('test get of elements', async () => {
        const elements = await button('similarButton').elements();
        expect(await elements[0].get()).to.be.a('number');
        expect(await elements[1].get()).to.be.a('number');
        expect(await elements[2].get()).to.be.a('number');
      });

      it('test exists of elements', async () => {
        let elements = await button('similarButton').elements();
        expect(await elements[0].exists()).to.be.true;
        expect(await elements[1].exists()).to.be.true;
        expect(await elements[2].exists()).to.be.true;
        expect(await button('someButton').exists()).to.be.false;
      });

      it('test description of elements', async () => {
        let elements = await button('similarButton').elements();
        expect(await elements[0].description).to.be.eql(
          'Button with label similarButton ',
        );
        expect(await elements[1].description).to.be.eql(
          'Button with label similarButton ',
        );
        expect(await elements[2].description).to.be.eql(
          'Button with label similarButton ',
        );
      });

      xit('test text of elements', async () => {
        let elements = await button('similarButton').elements();
        expect(await elements[0].description).to.be.eql(
          'Button with label similarButton ',
        );
        expect(await elements[1].description).to.be.eql(
          'Button with label similarButton ',
        );
        expect(await elements[2].description).to.be.eql(
          'Button with label similarButton ',
        );
      }); // Todo: should be fixed with #815
    });

    describe('button with contains match', () => {
      it('should match button with partial text', async () => {
        expect(await button('ForButton').exists()).to.be.true;
        expect(await button('ForReset').exists()).to.be.true;
        expect(await button('ForSubmit').exists()).to.be.true;
        expect(await button('ForImage').exists()).to.be.true;
      });
    });

    describe('button with wrapped element text', () => {
      it('should match button with child element text', async () => {
        expect(await button('spanButton').exists()).to.be.true;
        expect(await button('boldButton').exists()).to.be.true;
        expect(await button('italicButton').exists()).to.be.true;
        expect(await button('strongButton').exists()).to.be.true;
        expect(await button('childElementButton').exists()).to.be
          .true;
      });
    });

    describe('button with Hidden attribute', () => {
      it('Should match hidden buttons', async () => {
        expect(
          await button('HiddenButton', {
            selectHiddenElement: true,
          }).exists(),
        ).to.be.true;
        expect(
          await button('Input Hidden Reset', {
            selectHiddenElement: true,
          }).exists(),
        ).to.be.true;
        expect(
          await button('Input Hidden Submit', {
            selectHiddenElement: true,
          }).exists(),
        ).to.be.true;
      });
    });
  });
});
