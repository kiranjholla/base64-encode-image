'use strict';

function getContainerElement() {
  return document.getElementById('encodings');
}

function clearProcessedImages(context) {
  while (context.firstChild) {
    context.removeChild(context.firstChild);
  }
}

function buildCodeCell(content, index) {
  let code = document.createElement('textarea');
  code.id = `imgCode${index}`;
  code.className = 'imageCodeText';
  code.value = content;

  let codeCell = document.createElement('div');
  codeCell.id = `imgCodeCell${index}`;
  codeCell.className = 'imageCode';
  codeCell.appendChild(code);

  return codeCell;
}

function buildImageCell(content, index) {
  let img = document.createElement('img');
  img.src = content;
  img.id = `imgImg${index}`;

  let imgCell = document.createElement('div');
  imgCell.id = `imgImgCel${index}`;
  imgCell.className = 'imageImage';
  imgCell.appendChild(img);

  return imgCell;
}

function buildImageRow(content, index) {
  let imgRow = document.createElement('div');
  imgRow.id = `imageRow${index}`;
  imgRow.className = 'imageRow';

  [buildCodeCell(content, index), buildImageCell(content, index)].forEach(node => imgRow.appendChild(node));

  return imgRow;
}

function appendDataUrlToDocument(context, content, index) {
  let rowNode = buildImageRow(content, index);
  context.appendChild(rowNode);
}

function processSingleFile(context, imgFile, index) {
  let fileReader = new FileReader();
  fileReader.onloadend = () => appendDataUrlToDocument(context, fileReader.result, index);
  fileReader.readAsDataURL(imgFile);
}

function encodeImage(ele) {
  if (ele.files) {
    let context = getContainerElement();
    clearProcessedImages(context);

    for (let index = 0; index < ele.files.length; index++) {
      processSingleFile(context, ele.files.item(index), index);
    }
  }
}
