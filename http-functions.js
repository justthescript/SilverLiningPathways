/* =====================================================================
 * Silver Lining Pathways — Velo backend bridge
 * File location:  backend/http-functions.js   (in the Wix site, Dev Mode on)
 * ---------------------------------------------------------------------
 * Turns submissions from the <slp-page> custom forms into trackable Wix
 * leads (Contacts), so you keep full custom styling AND native Wix
 * lead tracking + Automations.
 *
 * Endpoints this file exposes (POST):
 *   Production:  https://www.silverliningpathwaysllc.com/_functions/lead
 *   Testing:     https://www.silverliningpathwaysllc.com/_functions-dev/lead
 *   (You must Publish the site at least once before the production URL works.)
 *
 * Wire it up in the custom element:
 *   <slp-page data-page="inquiry"
 *             data-endpoint="https://www.silverliningpathwaysllc.com/_functions/lead">
 *   </slp-page>
 *
 * For a branded booking-REQUEST intake (not live scheduling), reuse the same
 * endpoint and tag the lead differently:
 *   <slp-page data-page="inquiry"
 *             data-endpoint="…/_functions/lead"
 *             data-lead-type="booking">
 *   </slp-page>
 *
 * SETUP STEPS
 *   1. Wix Studio: open the Code panel (Velo / Dev Mode on).
 *      Wix Editor: turn on Dev Mode, then Backend & Public > Backend.
 *   2. Create  backend/http-functions.js  and paste this file in.
 *   3. (Optional but recommended) Create a CMS collection named "Leads"
 *      with text fields: title, contactId, email, phone, service, message,
 *      type, source, page  — and a date field: submittedAt. This gives you
 *      an at-a-glance lead list in the dashboard. If you skip it, the code
 *      still works — it just won't log the extra row.
 *   4. Publish the site.
 *   5. Set data-endpoint on the <slp-page> form element to the URL above.
 *
 * Leads appear under Contacts (labeled "Website Inquiry" / "Website Booking
 * Request"), and you can fire Wix Automations on the new contact/label.
 * ===================================================================== */

import { ok, badRequest, serverError, options } from 'wix-http-functions';
import { contacts } from 'wix-crm-backend';
import wixData from 'wix-data';
// import { triggeredEmails } from 'wix-crm-backend'; // uncomment to email a notification

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

// Handle the CORS preflight (harmless even though the form is same-origin).
export function options_lead(request) {
  return options({ headers: CORS });
}

export async function post_lead(request) {
  const headers = Object.assign({ 'Content-Type': 'application/json' }, CORS);
  try {
    const body = await request.body.json();

    const first   = (body.first   || '').trim();
    const last    = (body.last    || '').trim();
    const email   = (body.email   || '').trim();
    const phone   = (body.phone   || '').trim();
    const service = (body.service || '').trim();
    const message = (body.message || '').trim();
    const type    = (body.type    || 'inquiry').trim();
    const source  = (body.source  || 'website').trim();
    const page    = (body.page    || '').trim();

    if (!email || !message) {
      return badRequest({ headers, body: { ok: false, error: 'Email and message are required.' } });
    }

    const label = type === 'booking' ? 'Website Booking Request' : 'Website Inquiry';

    // 1) Create or update the Wix Contact — this is the trackable lead.
    //    appendOrCreateContact does NOT require member auth, so it's safe
    //    for a public form. It reconciles by email/phone, so repeat
    //    submitters won't create duplicates.
    const contactInfo = {
      name: { first: first || 'Website', last: last || 'Lead' },
      emails: email ? [{ email }] : [],
      phones: phone ? [{ phone }] : [],
      labelKeys: ['custom.' + (type === 'booking' ? 'website-booking-request' : 'website-inquiry')]
    };

    let contactId = null;
    try {
      const res = await contacts.appendOrCreateContact(contactInfo);
      contactId = res && res.contactId;
    } catch (e) {
      // If labelKeys aren't created yet, retry without them so the lead
      // still lands. (You can pre-create the labels under Contacts > Labels.)
      const res = await contacts.appendOrCreateContact({
        name: contactInfo.name, emails: contactInfo.emails, phones: contactInfo.phones
      });
      contactId = res && res.contactId;
    }

    // 2) Log the full submission to the "Leads" collection (optional).
    try {
      await wixData.insert('Leads', {
        title: ((first + ' ' + last).trim() || email),
        contactId, email, phone, service, message, type, source, page,
        submittedAt: new Date()
      });
    } catch (e) { /* collection not set up — ignore */ }

    // 3) Optional email notification (set up a triggered email first):
    // try {
    //   if (contactId) {
    //     await triggeredEmails.emailContact('YOUR_TEMPLATE_ID', contactId, {
    //       variables: { firstName: first, service, message }
    //     });
    //   }
    // } catch (e) { /* ignore email failures */ }

    return ok({ headers, body: { ok: true, contactId, label } });
  } catch (err) {
    return serverError({ headers, body: { ok: false, error: String(err) } });
  }
}
