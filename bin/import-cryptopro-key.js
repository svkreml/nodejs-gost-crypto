require('../lib/gostKeys');
const fs = require('fs');
const gostCrypto = require('../lib/gostCrypto');

let alias = 'alias';
let password = '';


let cerPath = './test2012cer/certificate.cer';
let pKeyPath = './test2012cer/privateKey.pkey';
alias = readFromFile('./test2012cer/alias');



let header = 'header.key';
let name = 'name.key';
let primary = 'primary.key';
let primary2 = 'primary2.key';
let masks = 'masks.key';
let masks2 = 'masks2.key';

let headerContent;
let nameContent;
let primaryContent;
let primary2Content;
let masksContent;
let masks2Content;


/*
this.parsedOptions = {};
const cli = createCli();

this.parsedOptions = cli.options;

cerPath = this.parsedOptions.certificate;
pKeyPath = this.parsedOptions.certificate;
alias = this.parsedOptions.alias;
password = this.parsedOptions.password;
*/






const dir = './' + alias;
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

let certificate = readFromFile(cerPath);

let privateKey = readFromFile(pKeyPath);


importPrivateKey();


//--------------------------------------------------------------------------------------------------------------------------------------------
function readFromFile(fileName) {
    return fs.readFileSync(fileName, 'utf8');
}


function writeToFile(fileName, bytes) {
    let createStream = fs.createWriteStream(dir + '/' + fileName);
    createStream.write(bytes);
    createStream.end();
}


function importPrivateKey() {
    this.gostCrypto = gostCrypto;
    // Create empty key container
    var keyContainer = new gostCrypto.keys.CryptoProKeyContainer();
    // Add key to conatiner


    return keyContainer.setKey(privateKey, password).then(function () {
        // Add certificate to container
        return keyContainer.setCertificate(certificate);
    }).then(function () {
        // Set container name
        keyContainer.setContainerName(alias);
        // Generate files
        var files = keyContainer.encode('PEM');


        headerContent = files.header;
        nameContent = files.name;
        primaryContent = files.primary;
        masksContent = files.masks;
        primary2Content = files.primary2;
        masks2Content = files.masks2;

        // checkStoreFiles();
        writeToFile(header, Buffer.from(headerContent, 'base64'));
        writeToFile(name, Buffer.from(nameContent, 'base64'));
        writeToFile(primary, Buffer.from(primaryContent, 'base64'));
        writeToFile(primary2, Buffer.from(primary2Content, 'base64'));
        writeToFile(masks, Buffer.from(masksContent, 'base64'));
        writeToFile(masks2, Buffer.from(masks2Content, 'base64'));

        console.log(keyContainer.header.items.keyContainerContent.items.primaryCertificate.items.signatureAlgorithm.item.item.items.algorithm)
        console.log('Success: The private key has been imported.');
    });
}


/*
function createCli() {
    const cli = require('cli')
        .enable('version')
        .setApp(__dirname + '/../package.json')
        .setUsage(this.toolName+' [OPTIONS]');

    var containerFiles = [];
    for (var key in this.containerKeysFiles) {
        containerFiles.push('"'+this.containerKeysFiles[key]+'"');
    }
    this.definedOptions.container[1] += ' '+containerFiles.join(', ');

    cli.width = 120;
    cli.option_width = 30;
    cli.parse(this.definedOptions);

    if (null == cli.options.container) {
        cli.getUsage();
        cli.exit(2);
    }

    return cli;
}*/
