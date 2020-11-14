import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import opt from '../../../utils/otp';
import httpHandler from '../http/httpHandler';
import { getSession } from 'next-auth/client';
import { stripeAPIErrorMessages } from 'src/utils/constants';

const stripe = new Stripe(process.env.STRIPE_API_KEY, { apiVersion: '2020-08-27' });

const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //TODO POST Request will be throw away code in the future
  if (req.method === 'POST') {
    try {
      const { email } = req.body;
      const isValid = true;
      if (isValid) {
        // Process a POST request
        const customer = await httpHandler(`${process.env.STRIPE_SEARCH_API}?query=${email}&prefix=false`, 'GET');
        const { id } = customer.data[0];
        const session = await stripe.billingPortal.sessions.create({
          customer: id,
          return_url: 'https://livingfitfamily.com/billing',
        });
        res.redirect(session.url);
        // res.status(200).json(session);
      } else {
        res.status(400);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (req.method === 'GET') {
    try {
      const userSession = await getSession({ req });
      if (!userSession) {
        return res.status(401).json({ message: stripeAPIErrorMessages.SESSION_EXPIRED });
      }

      const cert = fs.readFileSync('src/pages/api/certs/public.pem');
      const sub = await jwt.verify(userSession.accessToken, cert, (err, decoded) => decoded.sub);

      const customer = await httpHandler(`${process.env.STRIPE_SEARCH_API}?query=${sub}&prefix=false`, 'GET');
      if (!customer || customer.count === 0) {
        return res.status(401).json({ message: stripeAPIErrorMessages.UNAUTHORIZED });
      }

      const { id } = customer.data[0];
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: id,
        return_url: `http://${req.headers.host}`,
      });
      return res.status(200).json({ message: portalSession.url });
    } catch (err) {
      return res.status(500).json({ message: stripeAPIErrorMessages.SYSTEM_ERROR });
    }
  } else {
    res.status(405);
  }
}

export default allowCors(handler);
