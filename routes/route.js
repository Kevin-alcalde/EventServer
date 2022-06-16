const { Router } = require('express');
const res = require('express/lib/response');
const router = Router();
const fetch = require('node-fetch');
const bcu = require('bigint-crypto-utils');
const bigintConversion = require('bigint-conversion')
const { RsaPublicKey } = require('../rsaPublicKey');
const sha256 = require('crypto-js/sha256')


router.get("/", async (req, res) => {
    res.json({
        Title: "Hola mundo",
    });
})
publicKeyU = {}
eHexAllice = {}
nHexAllice = {}
publicKeyA = {}
signature = {}

router.post("/accessToEvent", async (req, res) => {
    //Handle the req tha should be the pubA and Sprivu(puba)
    //Then verify SprivU with pubU
    this.publicKeyU = await getPublicKeyU();
    console.log("PUBLICA DE LA UNI E" + this.publicKeyU.eHex)
    console.log("PUBLICA DE LA UNI N" + this.publicKeyU.nHex)
    console.log("IDENTIDAD SIGNATURE :" + req.body.identidadSignatureD)
    this.signature = req.body.identidadSignatureD
    this.eHexAllice = req.body.eHex
    this.nHexAllice = req.body.nHex
    console.log ("publica allice : " + this.eHexAllice)
    console.log ("publica allice : " + this.nHexAllice)
    const publicKey = new RsaPublicKey( bigintConversion.hexToBigint(this.eHexAllice), bigintConversion.hexToBigint(this.nHexAllice))
    

    //This is the way to 
    //Let's send a Nonce 
    if(null !== bcu.modPow(bigintConversion.hexToBigint(req.body.identidadSignatureD), bigintConversion.hexToBigint(this.publicKeyU.eHex), 
    bigintConversion.hexToBigint(this.publicKeyU.nHex))) {

        
    console.log(" confirmacion :" + bcu.modPow(bigintConversion.hexToBigint(req.body.identidadSignatureD), bigintConversion.hexToBigint(this.publicKeyU.eHex), 
    bigintConversion.hexToBigint(this.publicKeyU.nHex)))
    var nonce = "090aa2d35";
    res.json({
        "nonce": `${nonce}`
    })
    console.log("hemos entrado en el if!!")
}


}

)


router.post("/isValidAuthentication", async (req, res) => {
    console.log(req.body.nonceEnviar)
    var resultado = bcu.modPow( bigintConversion.hexToBigint(req.body.nonceEnviar), bigintConversion.hexToBigint(this.eHexAllice), bigintConversion.hexToBigint(this.nHexAllice))
    console.log(bigintConversion.bigintToHex(resultado) + " se parece?? " + this.nHexAllice)
    
    

    


    
    
})

async function getPublicKeyU() {
    //Performing a petition to get the public key of the University
    let response = await fetch(`http://localhost:3000/getPublicKey`);
    let data = await response.json();

    //console.log(data);
    return data;
}




module.exports = router;