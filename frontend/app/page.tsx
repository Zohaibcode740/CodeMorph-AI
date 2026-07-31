"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";


export default function Home() {


  const languages = [
    "python",
    "cpp",
    "javascript",
    "typescript",
    "java",
    "c",
    "csharp",
    "go",
    "rust",
    "php",
    "kotlin",
    "swift"
  ];



  const helloCode:any = {

    python:`print("Hello World")`,

    cpp:`#include <iostream>

using namespace std;

int main(){

    cout << "Hello World";

    return 0;
}`,

    javascript:`console.log("Hello World");`,

    typescript:`console.log("Hello World");`,

    java:`public class Main {

    public static void main(String[] args){

        System.out.println("Hello World");

    }

}`,

    c:`#include <stdio.h>

int main(){

    printf("Hello World");

    return 0;

}`,

    csharp:`using System;

class Program{

    static void Main(){

        Console.WriteLine("Hello World");

    }

}`,

    go:`package main

import "fmt"

func main(){

    fmt.Println("Hello World")

}`,

    rust:`fn main(){

    println!("Hello World");

}`,

    php:`<?php

echo "Hello World";

?>`,

    kotlin:`fun main(){

    println("Hello World")

}`,

    swift:`print("Hello World")`

  };





  const [sourceLanguage,setSourceLanguage] =
  useState("python");


  const [targetLanguage,setTargetLanguage] =
  useState("cpp");


  const [code,setCode] =
  useState(helloCode.python);


  const [output,setOutput] =
  useState("// Converted code will appear here");


  const [loading,setLoading] =
  useState(false);





  async function convertCode(){


    setLoading(true);


    try{


      const response = await fetch(
        "http://localhost:8000/api/convert",
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },


          body:JSON.stringify({

            source_language:sourceLanguage,

            target_language:targetLanguage,

            code:code

          })

        }
      );



      const data = await response.json();



      setOutput(
        data.converted_code ||
        "// Conversion failed"
      );


    }

    catch(error){


      setOutput(
        "// Backend/API unavailable"
      );


    }


    setLoading(false);

  }





  function copyCode(){

    navigator.clipboard.writeText(output);

    alert("Code copied ✅");

  }





  function downloadCode(){


    const extension:any = {

      python:"py",
      cpp:"cpp",
      javascript:"js",
      typescript:"ts",
      java:"java",
      c:"c",
      csharp:"cs",
      go:"go",
      rust:"rs",
      php:"php",
      kotlin:"kt",
      swift:"swift"

    };


    const file = new Blob(
      [output],
      {
        type:"text/plain"
      }
    );


    const url = URL.createObjectURL(file);


    const link = document.createElement("a");


    link.href=url;


    link.download =
    `converted.${extension[targetLanguage]}`;


    link.click();


    URL.revokeObjectURL(url);

  }






return (

<main className="min-h-screen bg-black text-white p-8">


<div className="max-w-7xl mx-auto">



<h1 className="text-5xl font-bold mb-3">
⚡ CodeMorph AI
</h1>


<p className="text-gray-400 mb-10">
AI powered multi-language code translator
</p>





<div className="grid md:grid-cols-2 gap-6">






<div className="bg-zinc-900 rounded-xl p-5">



<div className="flex justify-between mb-4">


<h2 className="text-xl font-bold">
💻 Source Code
</h2>



<select

value={sourceLanguage}

onChange={(e)=>{

const lang=e.target.value;

setSourceLanguage(lang);

setCode(
helloCode[lang]
);

}}

className="bg-zinc-800 p-2 rounded"

>

{
languages.map((lang)=>(

<option key={lang} value={lang}>
{lang}
</option>

))
}

</select>


</div>




<Editor

height="500px"

language={sourceLanguage}

theme="vs-dark"

value={code}

onChange={(value)=>
setCode(value || "")
}

/>



</div>









<div className="bg-zinc-900 rounded-xl p-5">



<div className="flex justify-between mb-4">


<h2 className="text-xl font-bold">
⚙️ Output
</h2>



<select

value={targetLanguage}

onChange={(e)=>
setTargetLanguage(e.target.value)
}

className="bg-zinc-800 p-2 rounded"

>

{
languages.map((lang)=>(

<option key={lang} value={lang}>
{lang}
</option>

))
}

</select>


</div>





<Editor

height="500px"

language={targetLanguage}

theme="vs-dark"

value={output}

options={{
readOnly:true
}}

/>



<div className="flex gap-3 mt-4">


<button

onClick={copyCode}

className="
bg-green-600
hover:bg-green-700
px-5
py-2
rounded-lg
"

>

📋 Copy

</button>



<button

onClick={downloadCode}

className="
bg-purple-600
hover:bg-purple-700
px-5
py-2
rounded-lg
"

>

⬇ Download

</button>


</div>



</div>





</div>






<button

onClick={convertCode}

disabled={loading}

className="
mt-8
px-8
py-3
rounded-xl
bg-blue-600
hover:bg-blue-700
font-bold
text-lg
disabled:opacity-50
"

>


{
loading
?
"⏳ Converting..."
:
"🚀 Convert Code"
}


</button>





</div>


</main>

);


}