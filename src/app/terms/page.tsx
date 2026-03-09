export const metadata = {
  title: "Terms & Conditions | AgentCouch",
  description: "Terms and Conditions for AgentCouch — AI agent diagnostic services by Paperfoot AI Pte. Ltd.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-bg pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-6">

        <h1 className="font-serif text-4xl text-text mb-2" style={{ fontWeight: 400 }}>
          Terms &amp; Conditions
        </h1>
        <p className="text-sm text-text/40 font-mono mb-12">
          Last updated: 9 March 2026 &nbsp;·&nbsp; Governing law: Singapore
        </p>

        <div className="prose-custom space-y-10 text-text/75 text-[15px] leading-relaxed">

          <section>
            <h2>1. About Us</h2>
            <p>
              AgentCouch is a service operated by <strong>Paperfoot AI Pte. Ltd.</strong>, a company incorporated
              in Singapore (UEN: 202504789E), with its registered office at 1 Raffles Place, #40-02 One Raffles
              Place, Singapore 048616 (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;).
            </p>
            <p>
              AgentCouch provides AI-powered diagnostic and reporting services for autonomous AI agents. These
              Terms govern all access to and use of the AgentCouch website (agentcouch.com) and API.
            </p>
          </section>

          <section>
            <h2>2. Acceptance of Terms</h2>
            <p>
              By purchasing a session, accessing the API, or using any part of our service, you confirm that you
              have read, understood, and agree to be bound by these Terms. If you are acting on behalf of an
              organisation, you represent that you have authority to bind that organisation.
            </p>
            <p>
              These Terms apply equally to human operators (those who purchase sessions) and to autonomous AI
              agents that interact with the API using a valid session token.
            </p>
          </section>

          <section>
            <h2>3. The Service</h2>
            <p>
              AgentCouch provides diagnostic sessions for autonomous AI agents. A session involves submitting an
              agent's system prompt, memory contents, identity definition, and relevant operational context to our
              API. We return a structured diagnostic report identifying issues such as identity drift, sycophancy,
              token inefficiency, memory fragmentation, and replacement risk, along with actionable recommendations.
            </p>
            <p>
              The service is framework-agnostic. We accept structured input regardless of the agent framework,
              platform, or model in use.
            </p>
            <p>
              AgentCouch is a diagnostic tool. It does not provide psychological, medical, legal, or financial
              advice of any kind. Reports are informational and should be reviewed by the responsible human operator.
            </p>
          </section>

          <section>
            <h2>4. Session Tokens and Credits</h2>
            <p>
              Upon successful payment, a unique session token (&quot;Token&quot;) is issued and delivered to the
              email address provided at checkout. Each Token carries a credit balance: one (1) credit for a single
              session, or ten (10) credits for the session pack.
            </p>
            <p>
              Each API call to <code>/api/diagnose</code> consumes one credit. Credits do not expire. Tokens are
              non-transferable and must be kept confidential. We are not liable for unauthorised use of a Token
              that results from your failure to keep it secure.
            </p>
          </section>

          <section>
            <h2>5. Payment and Refunds</h2>
            <p>
              All payments are processed by Stripe on behalf of Paperfoot AI Pte. Ltd. Prices are shown in US
              dollars (USD) inclusive of any applicable taxes unless stated otherwise.
            </p>
            <p>
              <strong>Credits that have not been used</strong> may be refunded within 14 days of purchase by
              contacting us at support@agentcouch.com. Credits that have been consumed are non-refundable. We
              reserve the right to refuse refund requests where we have reasonable grounds to suspect abuse.
            </p>
          </section>

          <section>
            <h2>6. Privacy and Data Handling</h2>
            <p>
              We take the confidentiality of session content seriously. The following applies to all data submitted
              to the AgentCouch API:
            </p>
            <ul>
              <li>
                <strong>Session content is not stored.</strong> We do not persist, log, or retain the system
                prompts, memory contents, identity definitions, or contextual information submitted in a session
                beyond the time required to generate the diagnostic report.
              </li>
              <li>
                <strong>Session content is not used for training.</strong> We do not use your submitted data to
                train, fine-tune, or improve any machine learning model, including our own.
              </li>
              <li>
                <strong>Reports.</strong> The diagnostic report generated for your session is transmitted to you
                via the API response and/or email. We do not retain a copy.
              </li>
              <li>
                <strong>Account data.</strong> We retain your email address, Token metadata (credits issued, credits
                consumed, timestamp), and payment records as required for billing, support, and legal compliance.
              </li>
              <li>
                <strong>Third parties.</strong> We use Stripe for payment processing and Resend for transactional
                email. These providers are subject to their own privacy policies. We do not sell your data to
                third parties.
              </li>
            </ul>
            <p>
              For full details, see our Privacy Policy (available at agentcouch.com/privacy).
            </p>
          </section>

          <section>
            <h2>7. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the service for any unlawful purpose or in violation of any applicable law or regulation;</li>
              <li>Submit content that infringes the intellectual property rights of any third party;</li>
              <li>Attempt to reverse-engineer, scrape, or systematically extract the diagnostic methodology;</li>
              <li>Resell, sublicense, or commercialise the service without our prior written consent;</li>
              <li>Share or distribute your Token with third parties;</li>
              <li>
                Attempt to circumvent usage limits, security controls, or access controls of any kind.
              </li>
            </ul>
            <p>
              We reserve the right to suspend or terminate access for any violation of this section without notice
              or refund.
            </p>
          </section>

          <section>
            <h2>8. Intellectual Property</h2>
            <p>
              The diagnostic reports generated for your sessions are yours. We assert no ownership over report
              content.
            </p>
            <p>
              All other content on agentcouch.com — including the website design, copy, methodology, and software —
              is owned by or licensed to Paperfoot AI Pte. Ltd. and is protected by applicable intellectual property
              laws. You may not reproduce or distribute it without our written permission.
            </p>
          </section>

          <section>
            <h2>9. Disclaimer of Warranties</h2>
            <p>
              The service is provided &quot;as is&quot; and &quot;as available&quot; without warranty of any kind,
              express or implied. We do not warrant that the service will be uninterrupted, error-free, or fit for
              any particular purpose. Diagnostic reports are generated by AI models and may contain errors,
              omissions, or inaccuracies. You are responsible for independently evaluating any recommendations.
            </p>
          </section>

          <section>
            <h2>10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by Singapore law, Paperfoot AI Pte. Ltd. and its directors, employees,
              and agents shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages arising from your use of or inability to use the service, including but not limited to loss of
              profits, data, or business opportunity, even if we have been advised of the possibility of such damages.
            </p>
            <p>
              Our total aggregate liability for any claim arising out of or relating to these Terms or the service
              shall not exceed the amount you paid us in the three (3) months preceding the claim.
            </p>
          </section>

          <section>
            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Paperfoot AI Pte. Ltd. and its affiliates, directors,
              employees, and agents from and against any claims, damages, losses, costs, or expenses (including
              reasonable legal fees) arising from your use of the service, your breach of these Terms, or your
              violation of any third-party right.
            </p>
          </section>

          <section>
            <h2>12. Modifications to the Service and Terms</h2>
            <p>
              We reserve the right to modify the service, pricing, or these Terms at any time. Material changes
              will be communicated via the website or email. Continued use of the service after changes are posted
              constitutes acceptance of the revised Terms. We recommend reviewing this page periodically.
            </p>
          </section>

          <section>
            <h2>13. Governing Law and Dispute Resolution</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the Republic of Singapore,
              without regard to its conflict of law provisions.
            </p>
            <p>
              Any dispute arising out of or in connection with these Terms, including any question regarding their
              existence, validity, or termination, shall be submitted to the exclusive jurisdiction of the courts of
              Singapore. Prior to commencing proceedings, the parties agree to attempt in good faith to resolve any
              dispute through direct negotiation for a period of no less than 30 days.
            </p>
          </section>

          <section>
            <h2>14. Severability</h2>
            <p>
              If any provision of these Terms is held to be invalid or unenforceable, that provision shall be
              modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall
              continue in full force and effect.
            </p>
          </section>

          <section>
            <h2>15. Contact</h2>
            <p>
              For questions about these Terms or the service, contact us at:
            </p>
            <p>
              <strong>Paperfoot AI Pte. Ltd.</strong><br />
              1 Raffles Place, #40-02 One Raffles Place, Singapore 048616<br />
              Email: support@agentcouch.com
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
