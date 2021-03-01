//var document = app.activeDocument;
// read any document you have open in the viewer (this will only work if you have something open)

var newDocument = app.documents.add(2550, 3300, 300, "My new PS doc", NewDocumentMode.RGB);
// create a new document
// width, height, pixels per inch, name, mode

var layers = newDocument.artLayers;
var newLayer = layers.add();
newLayer.name = "My new layer";

// layer types
newLayer.kind = LayerKind.TEXT;
//newLayer.layerKind = LayerKind.VIDEO;

// layer textItem
var textItem = newLayer.textItem;

// create an rgb colour
var myColour = new SolidColor();
var rgbPart = myColour.rgb;
rgbPart.red = 0;
rgbPart.green = 120;
rgbPart.blue = 255;

// access fonts and grab a random one
var fonts = app.fonts;
var randomFont = fonts[Math.floor(Math.random() * fonts.length)];

// adjust text appearance
textItem.contents = "My textttttt";
textItem.color = myColour;
textItem.font = randomFont.postScriptName;
textItem.size = 96;
textItem.justification = Justification.CENTER;
textItem.position = [newDocument.width*.5, 300];
//newLayer.translate(newDocument.width*.5, 0);

// lastly lets add an image, which seems a little convoluted
var file = new File("~/Pictures/Desktop BGs/stripes.jpg");
if(file.exists) {
        placeFile(file);
    }

// cleanup document for printing
newDocument.flatten();
newDocument.print();


// function found here:
// https://community.adobe.com/t5/photoshop/photoshop-scripts-for-image-layers-javascript/m-p/9903887
function placeFile(placeFile) {  

    var desc21 = new ActionDescriptor();  

    desc21.putPath( charIDToTypeID('null'), new File(placeFile) );  

    desc21.putEnumerated( charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa') );  

    var desc22 = new ActionDescriptor();  

    desc22.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0.000000 );  

    desc22.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0.000000 );  

    desc21.putObject( charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc22 );  

    executeAction( charIDToTypeID('Plc '), desc21, DialogModes.NO );  

}