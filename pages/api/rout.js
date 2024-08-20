
import nodemailer from 'nodemailer'
export const runtime = 'edge';
export const preferredRegion = 'iad1'; 
 const handler =async(req, res) =>{
         const e =   req.body
        const email = process.env.EMAIL;
        const pass = process.env.EMAIL_PASS;
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: email,
              pass,
            },
          });

          const mailOption = {
            from: 'sayedkhalil9920@gmail.com',
            to: `${e.emailTo},sayedkhalil992@gmail.com`,
            subject: `${e.title+e.code} `,
            html: `<!DOCTYPE html><html> <head>  <meta name="viewport" content="width=device-width, initial-scale=1"/></head> <body>
             <p  style="color:rgb(255, 251, 251); background-color:#6A2B56; padding-top: 5px; padding:5px ;text-align: right;font-size: 18pt; font-weight: bold;" >${e.title+e.code}</p>
              <p style="color:rgb(72, 26, 26); padding-top: 5px; padding:5px ;text-align: right; margin-top: 5px; width: 80%; font-size: 15pt; font-weight: bold;">${e.name}</p>
              <p style=" padding-top: 5px; padding:5px ;text-align: right; margin-top: 5px; width: 80%; font-size: 15pt;">${e.note.note}</p>
              <p style=" padding-top: 5px;margin: auto; background-color: antiquewhite; border-radius: 10px; padding:10px ;text-align: center; margin-top: 5px; width: 50%; font-size: 15pt; ">برجاء المتابعة على منصة إدارة المشاريع.</p>

             <hr/>
             <p style=" padding-top: 5px; padding:5px ; margin-top: 5px; width: 80%; font-size: 15pt;">تحياتي</p>
              <p style=" padding-top: 5px; padding:5px ; margin-top: 5px; width: 80%; font-size: 15pt; font-weight: bold;"> منصة إدارة المشاريع .</p>

            </body></html>` 

        }


        await transporter.sendMail(mailOption)

        transporter.sendMail(mailOption, function(error, info){
            if (error) {
              console.log("no")

              return( res.status(400).json({ success: true }))
            } else {
              console.log("yes")

              return( res.status(200).json({ success: false }))

            }
          })
        }

        export default handler