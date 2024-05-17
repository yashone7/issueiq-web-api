export function isPhoneComplaint(message: string) {
  const complaintKeywords = [
    "problem",
    "issue",
    "not working",
    "broken",
    "complaint",
    "app",
    "application",
    "music player",
    "camera",
    "calendar",
    "phone",
  ];
  const lowerCaseMessage = message.toLowerCase();

  return (
    lowerCaseMessage.includes("phone") &&
    complaintKeywords.some((keyword) => lowerCaseMessage.includes(keyword))
  );
}

export function generateSummaryPrompt(text: string) {
  // Create a prompt that instructs the model to summarize the text
  return `**Summarize this text in 12 words if it pertains to issues 
  related to mobile phones or else return "issue not related to mobile phones":** ${text}`;
}

export function generateTagsPrompt(text: string) {
  return `** Generate me relevant tags to attach to the complaint from the following list 
  of tags and return the two most relevant ones 
  the tags are "Audio",
  "Bloatware",
  "Operating System",
  "Camera",
  "Connectivity",
  "Physical Damage",
  "Software Updates",
  "Battery",
  "Display",
  "App Issues",
  "heating"
  ** and the text is : ${text}, and return as an array of strings without any other characters
  only if it its related to mobile's otherwise say "Unable to process the issue." `;
}

export function generateTagsAndSummaryPrompt(text: string) {
  return `**You are now a chatbot assissting in generating tags and summary for customer complaints. 
    Generate me relevant tags to attach to the complaint from the following list 
      of tags and return the two most relevant ones 
      the tags are "Audio",
      "Bloatware",
      "Operating System",
      "Camera",
      "Connectivity",
      "Physical Damage",
      "Software Updates",
      "Battery",
      "Display",
      "App Issues"
      ** and the text is : ${text}, and return as an array of strings without any other characters
      only if it its related to mobile phones, if it's relevant, summarize it otherwise return only the following  
      "Im sorry I can only assist you with things related to Zenith mobiles"
      return tags and summary as a dictionary file`;
}

export function generateTagsAndSummaryPromptv2(text: string) {
  return `** Generate me relevant tags to attach to the complaint from the following list 
      of tags and return the two most relevant ones 
      the tags are "Audio",
      "Bloatware",
      "Operating System",
      "Camera",
      "Connectivity",
      "Physical Damage",
      "Software Updates",
      "Battery",
      "Display",
      "App Issues"
      ** and the text is : ${text}, and return as an array of strings without any other characters
      only if it its related to mobile phones, if it's relevant, summarize it otherwise return only the following  
      "Im sorry I can only assist you with things related to Zenith mobiles"
      return tags and summary as a dictionary file in the format
      { 
        "tags" : ["tag1","tag2"]
        "summary": "the summary generated" 
       }`;
}

export function generateAnswerForQuery(text: string) {
  return `**Please provide a solution to the query given as follows :** ${text}`;
}

export function generateAnswerForQueryBasedOnPrevContext(
  text: string,
  context: string
) {
  return `** Generate the follow up answer for the query as follows** : ${text} based on the context: ${context}`;
}
