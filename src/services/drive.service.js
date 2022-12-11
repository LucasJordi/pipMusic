const url="https://script.google.com/macros/s/AKfycby9Qmgu36hTR_BHkQF8k6S8_3NUJ-hKqM9sBi6jyffvlMvCwUcBZgKdcmz-bkW4UFxNjA/exec"


export const fetchMusics=async()=>{
    return fetch(url,{
      method:"POST",
      body:JSON.stringify({driveId:"1z8o5LSH_ZX5rm7Rl5PT2Wdg1DGxIGNWB",type:"getAll"}),
      headers:{"Content-Type":"application/json"}
    })

}