<h1 class='p-2'>요청 테스트용 페이지 입니다.</h1>
<div class="w-dvw grid grid-cols-2">
  <button type='submit' class="m-2 w-fit" onclick={() => {sendIt()}}> 요청 전송</button>
  <b>응답 내용:</b>
</div>

<article class="flex w-dvw h-dvh p-2">
  <!-- 요청 입력란 -->
  <form class='w-[50%] border-r'>
  <div>
    <div class='flex place-items-center'>
      <b >URL:</b>
      <input type='text' class='px-2 rounded-xl w-full' bind:value={url}>
    </div>
    <div class='flex place-items-center'>
      <b >Headers:</b>
      <input type='text' class='w-[50%] mx-2 rounded-xl' bind:value={header.type}>
      <input type='text' class='w-[50%] mx-2 rounded-xl' bind:value={header.value}>
      <button type='button' class='w-10 h-10.5'>+</button>
    </div>
    <div class='flex place-items-center'>
      <b>Method:</b>
      <select name='Method' bind:value={method}>
        <option value='GET'>GET</option>
        <option value='POST'>POST</option>
        <option value='PUT'>PUT</option>
        <option value='DELETE'>DELETE</option>
        <option value='HEAD'>HEAD</option>
      </select>
    </div>
    <div class='flex flex-col'>
      <Codemirror
        bind:code={body}
        className="text-lg h-dvh" />
    </div>
  </div>
  </form>

  <!-- 응답 확인란 -->
  <div class='w-[50%]'>
    <pre>{answer}</pre>
  </div>
</article>

<style>
  b {
    width: 5rem;
  }
  div {
    padding: 0.5rem
  }
  select {
    border-radius: 0.75rem;
    margin-left: 0.25rem;
    width: 15.25rem;
  }
</style>

<script lang='ts'>
  import Codemirror from "$lib/components/codemirror/codemirror.svelte"
  import { needHeader } from "../utils/ForFetch";
  import { PUBLIC_API_HOST } from '$env/static/public';

  // 요청 
  let url = `${PUBLIC_API_HOST}/api/mybatis/texts`
  let method = 'GET'
  let header:App.Header = { type:"content-type", value:"application/json" }
  let body:string = `{
  "id": 0,
  "text": "string"
}`

  // 응답
  let answer:string = ''

  const sendIt = async () => {
    try {
      console.log("fetching..")
      const res = needHeader(method) || header.type.length < 1 ? await fetch(url, { method: method })
      : await fetch(url, {
        method: method,
        headers: {
          [header.type]: `${header.value}`,
        },
        body: body
      })//.then(val => val.json())
      //.then(val => answer = JSON.stringify(val, null, 2)) // fetch then은 
      const data = await res.json()
      answer = JSON.stringify(data, null, 2)
    } catch (err) {
      console.error("실패: ", err)
    }

  }
</script>