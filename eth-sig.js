// A JS library for recovering signatures:
const sigUtil = require('eth-sig-util')
const { corsHeaders } = require('./cors')

const JsonResponse = (data, options = {}) => {
    let resp = new Response(
        JSON.stringify(data),
        Object.assign(options, { headers: { 'Content-Type': 'application/json', ...corsHeaders } })
    )
    
    return resp
}

const recoverTypedSignature = async (request) => {
    const { data, sig } = await request.json()
    try {
        const recoveredAddress = sigUtil.recoverTypedSignature({
            data,
            sig
        })
        return JsonResponse({ code: 200, recoveredAddress })
    } catch (error) {
        return JsonResponse({ code: 400, error }, { status: 400 })
    }
}

const checkTypedSignature = async (request) => {
    const { data, sig, from } = await request.json()
    const signer = sigUtil.recoverTypedSignature({
        data,
        sig
    })
    if (signer === from) {
        return JsonResponse({ code: 200, isCorrect: true, signer })
    } else {
        return JsonResponse({ code: 400, isCorrect: false, signer })
    }

}

module.exports = { recoverTypedSignature, checkTypedSignature }