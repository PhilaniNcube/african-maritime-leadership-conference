// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mailchimp from '@mailchimp/mailchimp_marketing'

type Data = {
  name: string
}

mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: process.env.SERVER_PREFIX,
})

const listId = 'f13433e247'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {


  const { first_name,
        last_name,
        email,
        tel,
        title,
        company_name,
        company_postal_address,
        company_street_address,
        company_registration_number,
        sector,
        other_sector} = req.body;

  const subscribingUser = {
        first_name,
        last_name,
        email,
        tel,
        title,
        company_name,
        company_postal_address,
        company_street_address,
        company_registration_number,
        sector,
        other_sector
      }


      try {

     const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: subscribingUser.first_name,
        LNAME: subscribingUser.last_name,
        PHONE: subscribingUser.tel,
        TITLE: subscribingUser.title,
        CNAME: subscribingUser.company_name,
        CPOSTALADD: subscribingUser.company_postal_address,
        CSTREETADD: subscribingUser. company_street_address,
        IDNUM: subscribingUser.company_registration_number,
        SECTOR: subscribingUser.sector === "Other" ? subscribingUser.other_sector : subscribingUser.sector ,
      }}
      )

      } catch (err) {
            console.log(err)
            res.status(400).send({ err })
      }

  res.status(200).json({ name: 'John Doe', listId })
}
