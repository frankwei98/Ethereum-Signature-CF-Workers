const Router = require('./router')
const sigUtil = require('./eth-sig')
const handleOptions = require('./cors')
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const landing = `
<h1>Ethereum Typed Signature Checker</h1>
<p>Click the below button to generate a new QR code. This will make a request to your serverless function.</p>
<input type="text" id="data" value="" placeholder="The Original Data in JSON String"></input>
<input type="text" id="sig" value="" placeholder="The Sig"></input>
<button onclick='generate()'>Get The Signer's Address</button>
<p>Check the "Network" tab in your browser's developer tools to see the generated QR code.</p>
<script>
  function generate() {
    const data = JSON.parse(document.querySelector("#data").value)
    fetch('/get-signer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        data: data ,
        sig: document.querySelector("#sig").value
      })
    })
  }
</script>
`

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  const r = new Router()
  r.options('/get-signer', handleOptions)
  r.get('/', () => new Response(landing, { headers: { 'Content-Type': 'text/html' } }))
  r.post('/get-signer', sigUtil.recoverTypedSignature)
  return r.route(request)
}
