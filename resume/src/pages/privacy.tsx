export default function Privacy() {
  return (
    <div className="container max-w-screen-md">
      <h1 className="text-xl lg:text-3xl font-bold mb-4">
        Privacy Policy
      </h1>
      <p className="mb-6">
        Thank you for using Resume Checker. Your privacy is very important to us, 
        and we are committed to being transparent about how we handle your data. 
        Below you'll find details about our privacy practices:
      </p>
      <ul className="list-disc pl-4">
        <li className="mb-4">
          <p className="font-bold mb-2">
            We don't store resumes or personal information
          </p>
          <p>
            The Resume Checker tool does not store resumes or any information 
            contained in them on our servers or anywhere else. Once your document 
            is processed, all data is immediately deleted.
          </p>
        </li>
        <li className="mb-4">
          <p className="font-bold mb-2">
            Use of artificial intelligence technology
          </p>
          <p>
            For content analysis and feedback, the tool uses Gemini AI. This 
            process is conducted securely and no data is retained after analysis.
          </p>
        </li>
        <li className="mb-4">
          <p className="font-bold mb-2">Data security</p>
          <p>
            We ensure your data is processed in a secure environment. Since we 
            don't store information, there is no risk of unauthorized access or 
            misuse of your data.
          </p>
        </li>
        <li className="mb-4">
          <p className="font-bold mb-2">Third-party services</p>
          <p>
            The Resume Checker tool uses Gemini AI for content analysis and 
            feedback generation. Gemini AI operates under its own privacy and 
            security policies designed to handle your data responsibly.
          </p>
        </li>
        <li className="mb-4">
          <p className="font-bold mb-2">Your consent</p>
          <p>
            By using the Resume Checker tool, you agree to the terms described 
            in this Privacy Policy.
          </p>
        </li>
      </ul>
    </div>
  );
}