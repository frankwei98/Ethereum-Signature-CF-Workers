// A JS library for recovering signatures:
const sigUtil = require('eth-sig-util')

const recoverTypedSignature = async (request) => {
    const { data, sig } = await request.json()
    const recoveredAddress = sigUtil.recoverTypedSignature({
        data,
        sig
    })
    return new Response({ code: 200, recoveredAddress })
}

const checkTypedSignature = async (request) => {
    const { data, sig, from } = await request.json()
    const signer = sigUtil.recoverTypedSignature({
        data,
        sig
    })
    if (signer === from) {
        return new Response({ code: 200, isCorrect: true, signer })
    } else {
        return new Response({ code: 400, isCorrect: false, signer })
    }

}

export { recoverTypedSignature, checkTypedSignature }