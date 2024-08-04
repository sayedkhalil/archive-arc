import Mailjet from "node-mailjet";

const mailjetClient  = Mailjet
	.apiConnect("c3417fc444109477b7aae51bad8e0945","b1b4d0b99a11f0c629ffd94b41ef64d5")
      
export  const sendEmail=async({ to, from, subject, message }) =>{
    const emailData = {
      Messages: [
        {
          From: {
            Email: from,
            Name: 'Your Name',
          },
          To: [
            {
              Email: to,
              Name: 'Recipient Name',
            },
          ],
          Subject: subject,
          TextPart: message,
        },
      ],
    };
  
    try {
      const result = await mailjetClient.post('send', { version: 'v3.1' }).request(emailData);
      console.log('Email sent successfully!');
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
  