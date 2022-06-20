const { Router } = require('express');
const res = require('express/lib/response');
const router = Router();
const fetch = require('node-fetch');
const bcu = require('bigint-crypto-utils');
const bigintConversion = require('bigint-conversion')
const { RsaPublicKey } = require('../rsaPublicKey');
const sha256 = require('crypto-js/sha256');
const SHA256 = require('crypto-js/sha256');


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
    console.log("PUBLIC KEY ENVIADA DESDE LA UPC E : " + this.publicKeyU.eHex)
    console.log("PUBLIC KEY ENVIADA DESDE LA UPC N : " + this.publicKeyU.nHex)
    console.log("IDENTIDAD SIGNATURE :" + req.body.identidadSignatureD)
    this.signature = req.body.identidadSignatureD
    this.eHexAllice = req.body.eHex
    this.nHexAllice = req.body.nHex
    console.log("publica allice : " + this.eHexAllice)
    console.log("publica allice : " + this.nHexAllice)
    const allicePublicKey = new RsaPublicKey(bigintConversion.hexToBigint(this.eHexAllice), bigintConversion.hexToBigint(this.nHexAllice))
    const publicKeyUPC = new RsaPublicKey(bigintConversion.hexToBigint(this.publicKeyU.eHex), bigintConversion.hexToBigint(this.publicKeyU.nHex))

    //Let's send a Nonce 
    console.log("PORFAVOOOR  " + bigintConversion.bigintToHex(publicKeyUPC.verify(bigintConversion.hexToBigint(req.body.identidadSignatureD))))


    const prueba_verificadaPublicKey = bigintConversion.bigintToHex(publicKeyUPC.verify(bigintConversion.hexToBigint(this.signature)))
    console.log("PORFAVOOOR en HEX " + prueba_verificadaPublicKey)

    let descerealizacion = {
        e: bigintConversion.bigintToHex(this.eHexAllice),
        n: bigintConversion.bigintToHex(this.eHexAllice)
    }

    const comprobacion = sha256(JSON.stringify(descerealizacion)).toString()
    console.log("COMPROBARCIOOOONNG : " + comprobacion)


    const publicUniversity = new RsaPublicKey(bigintConversion.hexToBigint(this.publicKeyU.eHex), bigintConversion.hexToBigint(this.publicKeyU.nHex))

    const hashFirma = bigintConversion.bigintToHex(publicUniversity.verify(bigintConversion.hexToBigint(this.signature)))
    console.log(" COMPROBACIOOONGGG 2: " + hashFirma)

    console.log("HASH A IGUALAS " + SHA256(allicePublicKey).toString())

    if (SHA256(allicePublicKey).toString() === bigintConversion.bigintToHex(publicUniversity.verify(bigintConversion.hexToBigint(this.signature))),
        bigintConversion.hexToBigint(this.publicKeyU.nHex)) {
        var nonce = "90aa2d35";
        res.json({
            "nonce": `${nonce}`
        })
        console.log("hemos entrado en el if!! y este es el nonce que se envia " + nonce)
    }
})


router.post("/isValidAuthentication", async (req, res) => {
    console.log(req.body.nonceEnviar)
    var nonce = "90aa2d35"
    const nonceFirmado = req.body.nonceEnviar
    console.log(nonceFirmado)

    const allicePublicKey = new RsaPublicKey(bigintConversion.hexToBigint(this.eHexAllice), bigintConversion.hexToBigint(this.nHexAllice))
    console.log("esto da la verificacion  " + bigintConversion.bigintToHex(allicePublicKey.verify(bigintConversion.hexToBigint(nonceFirmado))))
    if (nonce = bigintConversion.bigintToHex(allicePublicKey.verify(bigintConversion.hexToBigint(nonceFirmado)))) {
        console.log("SE ACABO??? ")
        var veredicto = "200";
        res.json({
            "veredicto": `${veredicto}`
        })
    }
})

async function getPublicKeyU() {
    //Performing a petition to get the public key of the University
    let response = await fetch(`http://localhost:3000/getPublicKey`);
    let data = await response.json();

    //console.log(data);
    return data;
}

module.exports = router;