
const getLanguageVersion = (lang)=>{

    const language = {
        "cpp":7,
        "java":6,
        "python3":6,
    }

    const version = language[lang.toLowerCase()];

    return version;
}

const getCodeResult = async (completeCode,version,lang)=>{
  try {
        
     const response = await fetch(
      "https://api.jdoodle.com/v1/execute",
      {
          method: "POST",
  
          headers: {
              "Content-Type": "application/json"
          },
  
          body: JSON.stringify({
              clientId: process.env.JDOODLE_CLIENT_ID,
              clientSecret: process.env.JDOODLE_CLIENT_SECRET,
  
              script: completeCode,
  
              stdin: "",
  
              language: lang,
              versionIndex: version
          })
      }
  )
    
  return response;
  
  } catch (error) {
      console.log(error);
      return res.status(500).send(error);
  }
}

export {getLanguageVersion , getCodeResult};