import Router from "next/router";
import styles from "../styles/footer.module.scss";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Cookie from "js-cookie";
import ZeroAction from "../store/actions/ZeroAction";
import LogoutAction from "../store/actions/LogoutAction";
import classnames from "classnames";

const Footer = () => {
  const dispatch = useDispatch();

  const [isTCModalActive, setIsTCModalActive] = useState(false);
  const [isRPModalActive, setIsRPModalActive] = useState(false);
  const [isPPModalActive, setIsPPModalActive] = useState(false);

  const handleLogout = () => {
    Cookie.remove("jwt");
    dispatch(ZeroAction());
    dispatch(LogoutAction());
    Router.push("/");
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={classnames({
          [styles.tcModalBg]: true,
          [styles.modalBgActive]: isTCModalActive,
        })}
      >
        <div className={styles.modal}>
          <h1>Terms and Conditions</h1>
          <div className={styles.text}>
            <p>
              1. Introduction
              <br />
              <br />
              This website is operated by DroneX. The terms “we”, “us”, and
              “our” refer to DroneX. The use of our website is subject to the
              following terms and conditions of use, as amended from time to
              time (the “Terms”). The Terms are to be read together by you with
              any terms, conditions or disclaimers provided in the pages of our
              website. Please review the Terms carefully. The Terms apply to all
              users of our website, including without limitation, users who are
              browsers, customers, merchants, vendors and/or contributors of
              content. If you access and use this website, you accept and agree
              to be bound by and comply with the Terms and our Privacy Policy.
              If you do not agree to the Terms or our Privacy Policy, you are
              not authorized to access our website, use any of our website’s
              services or place an order on our website.
              <br />
              <br />
              2. Use of our Website
              <br />
              <br />
              You agree to use our website for legitimate purposes and not for
              any illegal or unauthorized purpose, including without limitation,
              in violation of any intellectual property or privacy law. By
              agreeing to the Terms, you represent and warrant that you are at
              least the age of majority in your state or province of residence
              and are legally capable of entering into a binding contract.
              <br />
              <br />
              You agree to not use our website to conduct any activity that
              would constitute a civil or criminal offence or violate any law.
              You agree not to attempt to interfere with our website’s network
              or security features or to gain unauthorized access to our
              systems.
              <br />
              <br />
              You agree to provide us with accurate personal information, such
              as your email address, mailing address and other contact details
              in order to complete your order or contact you as needed. You
              agree to promptly update your account and information. You
              authorize us to collect and use this information to contact you in
              accordance with our Privacy Policy.
              <br />
              <br />
              3. General Conditions
              <br />
              <br />
              We reserve the right to refuse service to anyone, at any time, for
              any reason. We reserve the right to make any modifications to the
              website, including terminating, changing, suspending or
              discontinuing any aspect of the website at any time, without
              notice. We may impose additional rules or limits on the use of our
              website. You agree to review the Terms regularly and your
              continued access or use of our website will mean that you agree to
              any changes.
              <br />
              <br />
              You agree that we will not be liable to you or any third party for
              any modification, suspension or discontinuance of our website or
              for any service, content, feature or product offered through our
              website.
              <br />
              <br />
              4. Products or Services
              <br />
              <br />
              All purchases through our website are subject to product
              availability. We may, in our sole discretion, limit or cancel the
              quantities offered on our website or limit the sales of our
              products or services to any person, household, geographic region
              or jurisdiction.
              <br />
              <br />
              Prices for our products are subject to change, without notice.
              Unless otherwise indicated, prices displayed on our website are
              quoted in Canadian dollars.
              <br />
              <br />
              We reserve the right, in our sole discretion, to refuse orders,
              including without limitation, orders that appear to be placed by
              distributors or resellers. If we believe that you have made a
              false or fraudulent order, we will be entitled to cancel the order
              and inform the relevant authorities.
              <br />
              <br />
              We do not guarantee the accuracy of the colour or design of the
              products on our website. We have made efforts to ensure the colour
              and design of our products are displayed as accurately as possible
              on our website.
              <br />
              <br />
              5. Links to Third-Party Websites
              <br />
              <br />
              Links from or to websites outside our website are meant for
              convenience only. We do not review, endorse, approve or control,
              and are not responsible for any sites linked from or to our
              website, the content of those sites, the third parties named
              therein, or their products and services. Linking to any other site
              is at your sole risk and we will not be responsible or liable for
              any damages in connection with linking. Links to downloadable
              software sites are for convenience only and we are not responsible
              or liable for any difficulties or consequences associated with
              downloading the software. Use of any downloaded software is
              governed by the terms of the license agreement, if any, which
              accompanies or is provided with the software.
              <br />
              <br />
              6. Use Comments, Feedback, and Other Submissions
              <br />
              <br />
              You acknowledge that you are responsible for the information,
              profiles, opinions, messages, comments and any other content
              (collectively, the “Content”) that you post, distribute or share
              on or through our website or services available in connection with
              our website. You further acknowledge that you have full
              responsibility for the Content, including but limited to, with
              respect to its legality, and its trademark, copyright and other
              intellectual property ownership.
              <br />
              <br />
              You agree that any Content submitted by you in response to a
              request by us for a specific submission may be edited, adapted,
              modified, recreated, published, or distributed by us. You further
              agree that we are under no obligation to maintain any Content in
              confidence, to pay compensation for any Content or to respond to
              any Content.
              <br />
              <br />
              You agree that you will not post, distribute or share any Content
              on our website that is protected by copyright, trademark, patent
              or any other proprietary right without the express consent of the
              owner of such proprietary right. You further agree that your
              Content will not be unlawful, abusive or obscene nor will it
              contain any malware or computer virus that could affect our
              website’s operations. You will be solely liable for any Content
              that you make and its accuracy. We have no responsibility and
              assume no liability for any Content posted by you or any
              third-party.
              <br />
              <br />
              We reserve the right to terminate your ability to post on our
              website and to remove and/or delete any Content that we deem
              objectionable. You consent to such removal and/or deletion and
              waive any claim against us for the removal and/or deletion of your
              Content.
              <br />
              <br />
              7. Your Personal Information
              <br />
              <br />
              Please see our Privacy Policy to learn about how we collect, use,
              and share your personal information.
              <br />
              <br />
              8. Errors and Omissions
              <br />
              <br />
              Please note that our website may contain typographical errors or
              inaccuracies and may not be complete or current. We reserve the
              right to correct any errors, inaccuracies or omissions and to
              change or update information at any time, without prior notice
              (including after an order has been submitted). Such errors,
              inaccuracies or omissions may relate to product description,
              pricing, promotion and availability and we reserve the right to
              cancel or refuse any order placed based on incorrect pricing or
              availability information, to the extent permitted by applicable
              law.
              <br />
              <br />
              We do not undertake to update, modify or clarify information on
              our website, except as required by law.
              <br />
              <br />
              9. Disclaimer and Limitation of Liability
              <br />
              <br />
              You assume all responsibility and risk with respect to your use of
              our website, which is provided “as is” without warranties,
              representations or conditions of any kind, either express or
              implied, with regard to information accessed from or via our
              website, including without limitation, all content and materials,
              and functions and services provided on our website, all of which
              are provided without warranty of any kind, including but not
              limited to warranties concerning the availability, accuracy,
              completeness or usefulness of content or information,
              uninterrupted access, and any warranties of title,
              non-infringement, merchantability or fitness for a particular
              purpose. We do not warrant that our website or its functioning or
              the content and material of the services made available thereby
              will be timely, secure, uninterrupted or error-free, that defects
              will be corrected, or that our websites or the servers that make
              our website available are free of viruses or other harmful
              components.
              <br />
              <br />
              The use of our website is at your sole risk and you assume full
              responsibility for any costs associated with your use of our
              website. We will not be liable for any damages of any kind related
              to the use of our website.
              <br />
              <br />
              In no event will we, or our affiliates, our or their respective
              content or service providers, or any of our or their respective
              directors, officers, agents, contractors, suppliers or employees
              be liable to you for any direct, indirect, special, incidental,
              consequential, exemplary or punitive damages, losses or causes of
              action, or lost revenue, lost profits, lost business or sales, or
              any other type of damage, whether based in contract or tort
              (including negligence), strict liability or otherwise, arising
              from your use of, or the inability to use, or the performance of,
              our website or the content or material or functionality through
              our website, even if we are advised of the possibility of such
              damages.
              <br />
              <br />
              Certain jurisdictions do not allow limitation of liability or the
              exclusion or limitation of certain damages. In such jurisdictions,
              some or all of the above disclaimers, exclusions, or limitations,
              may not apply to you and our liability will be limited to the
              maximum extent permitted by law.
              <br />
              <br />
              10. Indemnification
              <br />
              <br />
              You agree to defend and indemnify us, and hold us and our
              affiliates harmless,, and our and their respective directors,
              officers, agents, contractors, and employees against any losses,
              liabilities, claims, expenses (including legal fees) in any way
              arising from, related to or in connection with your use of our
              website, your violation of the Terms, or the posting or
              transmission of any materials on or through the website by you,
              including but not limited to, any third party claim that any
              information or materials provided by you infringe upon any third
              party proprietary rights.
              <br />
              <br />
              11. Entire Agreement
              <br />
              <br />
              The Terms and any documents expressly referred to in them
              represent the entire agreement between you and us in relation to
              the subject matter of the Terms and supersede any prior agreement,
              understanding or arrangement between you and us, whether oral or
              in writing. Both you and we acknowledge that, in entering into
              these Terms, neither you nor we have relied on any representation,
              undertaking or promise given by the other or implied from anything
              said or written between you and us prior to such Terms, except as
              expressly stated in the Terms.
              <br />
              <br />
              12. Waiver
              <br />
              <br />
              Our failure to exercise or enforce any right or provision of the
              Terms will not constitute a waiver of such right or provision. A
              waiver by us of any default will not constitute a waiver of any
              subsequent default. No waiver by us is effective unless it is
              communicated to you in writing.
              <br />
              <br />
              13. Headings
              <br />
              <br />
              Any headings and titles herein are for convenience only.
              <br />
              <br />
              14. Severability
              <br />
              <br />
              If any of the provisions of the Terms are determined by any
              competent authority to be invalid, unlawful or unenforceable, such
              provision will to that extent be severed from the remaining Terms,
              which will continue to be valid and enforceable to the fullest
              extent permitted by law.
              <br />
              <br />
              15. Governing Law
              <br />
              <br />
              Any disputes arising out of or relating to the Terms, the Privacy
              Policy, use of our website, or our products or services offered on
              our website will be resolved in accordance with the laws of= the
              Province of Sesame Street without regard to its conflict of law
              rules. Any disputes, actions or proceedings relating to the Terms
              or your access to or use of our website must be brought before the
              courts of the Province of Sesame in the City of Sesame, Sesame and
              you irrevocably consent to the exclusive jurisdiction and venue of
              such courts.
              <br />
              <br />
              16. Questions or Concerns
              <br />
              <br />
              Please send all questions, comments and feedback to us at
              dronex327@gmail.com.
            </p>
          </div>
          <button
            onClick={() => setIsTCModalActive(false)}
            className={styles.button}
          >
            Close
          </button>
        </div>
      </div>

      <div
        className={classnames({
          [styles.rpModalBg]: true,
          [styles.modalBgActive]: isRPModalActive,
        })}
      >
        <div className={styles.modal}>
          <h1>Return Policy</h1>
          <div className={styles.text}>
            <p>
              1. Returns
              <br />
              <br />
              Option 1 – No Refunds/Exchanges:
              <br />
              <br />
              We do not accept returns or exchanges unless the item you
              purchased is defective. If you receive a defective item, please
              contact us at dronex327@gmail.com with details of the product and
              the defect. You can send the item you consider defective to:
              <br />
              <br />
              123 Sesame Street
              <br />
              <br />
              Upon receipt of the returned product, we will fully examine it and
              notify you via e-mail, within a reasonable period of time, whether
              you are entitled to a refund or a replacement as a result of the
              defect. If you are entitled to a replacement or refund, we will
              replace the product or refund the purchase price, using the
              original method of payment.
              <br />
              <br />
              Option 2 – Refunds Permitted:
              <br />
              <br />
              We accept returns. You can return unopened items in the original
              packaging within 30 days of your purchase with receipt or proof of
              purchase. If 30 days or more have passed since your purchase, we
              cannot offer you a refund or an exchange. Upon receipt of the
              returned item, we will fully examine it and notify you via email,
              within a reasonable period of time, whether you are entitled to a
              return. If you are entitled to a return, we will refund your
              purchase price and a credit will automatically be applied to your
              original method of payment. Only regular priced items may be
              refunded. Sale items are non-refundable. To follow-up on the
              status of your return, please contact us at dronex327@gmail.com.
              <br />
              <br />
              2. Exchanges [Delete if you select Option 1] We only exchange
              goods if they are defective or damaged. In circumstances where you
              consider that a product is defective, you should promptly contact
              us at dronex327@gmail.com with details of the product and the
              defect. You can send the item you consider defective to: 123
              Sesame Street.
              <br />
              <br />
              Upon receipt of the returned product, we will fully examine it and
              notify you via e-mail, within a reasonable period of time, whether
              you are entitled to a replacement as a result of the defect. If
              you are eligible, we will send you a replacement product.
              <br />
              <br />
              3. Exceptions [May be included if you select Option 2]
              <br />
              <br />
              Some items are non-refundable and non-exchangeable. These include:
              Drones.
              <br />
              <br />
              4. Shipping
              <br />
              <br />
              To return the item you purchased, please mail it to: 123 Sesame
              Street.
              <br />
              <br />
              Refunds do not include any shipping and handling charges shown on
              the packaging slip or invoice. Shipping charges for all returns
              must be prepaid and insured by you. You are responsible for any
              loss or damage to hardware during shipment. We do not guarantee
              that we will receive your returned item. Shipping and handling
              charges are not refundable. Any amounts refunded will not include
              the cost of shipping.
            </p>
          </div>
          <button
            onClick={() => setIsRPModalActive(false)}
            className={styles.button}
          >
            Close
          </button>
        </div>
      </div>

      <div
        className={classnames({
          [styles.ppModalBg]: true,
          [styles.modalBgActive]: isPPModalActive,
        })}
      >
        <div className={styles.modal}>
          <h1>Privacy Policy</h1>
          <div className={styles.text}>
            <p>
              1. Introduction
              <br />
              <br />
              We are responsible for maintaining and protecting the Personal
              Information under our control. We have designated an individual or
              individuals who is/are responsible for compliance with our privacy
              policy.
              <br />
              <br />
              2. Identifying Purposes
              <br />
              <br />
              We collect, use and disclose Personal Information to provide you
              with the product or service you have requested and to offer you
              additional products and services we believe you might be
              interested in. The purposes for which we collect Personal
              Information will be identified before or at the time we collect
              the information. In certain circumstances, the purposes for which
              information is collected may be clear, and consent may be implied,
              such as where your name, address and payment information is
              provided as part of the order process.
              <br />
              <br />
              3. Consent
              <br />
              <br />
              Knowledge and consent are required for the collection, use or
              disclosure of Personal Information except where required or
              permitted by law. Providing us with your Personal Information is
              always your choice. However, your decision not to provide certain
              information may limit our ability to provide you with our products
              or services. We will not require you to consent to the collection,
              use, or disclosure of information as a condition to the supply of
              a product or service, except as required to be able to supply the
              product or service.
              <br />
              <br />
              4. Limiting Collection
              <br />
              <br />
              The Personal Information collected will be limited to those
              details necessary for the purposes identified by us. With your
              consent, we may collect Personal Information from you in person,
              over the telephone or by corresponding with you via mail,
              facsimile, or the Internet.
              <br />
              <br />
              5. Limiting Use, Disclosure and Retention
              <br />
              <br />
              Personal Information may only be used or disclosed for the purpose
              for which it was collected unless you have otherwise consented, or
              when it is required or permitted by law. Personal Information will
              only be retained for the period of time required to fulfill the
              purpose for which we collected it or as may be required by law.
              [If applicable, include a description of any parties with whom you
              may share Personal Information.]
              <br />
              <br />
              6. Accuracy
              <br />
              <br />
              Personal Information will be maintained in as accurate, complete
              and up-to-date form as is necessary to fulfill the purposes for
              which it is to be used.
              <br />
              <br />
              7. Safeguarding Customer Information
              <br />
              <br />
              Personal Information will be protected by security safeguards that
              are appropriate to the sensitivity level of the information. We
              take all reasonable precautions to protect your Personal
              Information from any loss or unauthorized use, access or
              disclosure.
              <br />
              <br />
              8. Openness
              <br />
              <br />
              We will make information available to you about our policies and
              practices with respect to the management of your Personal
              Information.
              <br />
              <br />
              9. Customer Access
              <br />
              <br />
              Upon request, you will be informed of the existence, use and
              disclosure of your Personal Information, and will be given access
              to it. You may verify the accuracy and completeness of your
              Personal Information, and may request that it be amended, if
              appropriate. However, in certain circumstances permitted by law,
              we will not disclose certain information to you. For example, we
              may not disclose information relating to you if other individuals
              are referenced or if there are legal, security or commercial
              proprietary restrictions.
              <br />
              <br />
              10. Handling Customer Complaints and Suggestions
              <br />
              <br />
              You may direct any questions or enquiries with respect to our
              privacy policy or our practices by contacting:
              dronex327@gmail.com.
              <br />
              <br />
              Additional Information
              <br />
              <br />
              Cookies
              <br />
              <br />
              A cookie is a small computer file or piece of information that may
              be stored in your computer's hard drive when you visit our
              websites. We may use cookies to improve our website’s
              functionality and in some cases, to provide visitors with a
              customized online experience.
              <br />
              <br />
              Cookies are widely used and most web browsers are configured
              initially to accept cookies automatically. You may change your
              Internet browser settings to prevent your computer from accepting
              cookies or to notify you when you receive a cookie so that you may
              decline its acceptance. Please note, however, if you disable
              cookies, you may not experience optimal performance of our
              website.
              <br />
              <br />
              Other Websites
              <br />
              <br />
              Our website may contain links to other third party sites that are
              not governed by this privacy policy. Although we endeavour to only
              link to sites with high privacy standards, our privacy policy will
              no longer apply once you leave our website. Additionally, we are
              not responsible for the privacy practices employed by third party
              websites. Therefore, we suggest that you examine the privacy
              statements of those sites to learn how your information may be
              collected, used, shared and disclosed.
            </p>
          </div>
          <button
            onClick={() => setIsPPModalActive(false)}
            className={styles.button}
          >
            Close
          </button>
        </div>
      </div>

      <div className={styles.button_div}>
        <button
          onClick={() => Router.push("/product")}
          className={styles.button}
        >
          Shop
        </button>
        <button
          className={styles.button}
          onClick={() => setIsTCModalActive(true)}
        >
          Terms and Conditions
        </button>
        <button
          className={styles.button}
          onClick={() => setIsPPModalActive(true)}
        >
          Privacy Policy
        </button>
        <button
          className={styles.button}
          onClick={() => setIsRPModalActive(true)}
        >
          Return Policy
        </button>
        <button className={styles.sign_out} onClick={handleLogout}>
          Sign Out
        </button>
      </div>
      <p className={styles.copyright}>&copy; DroneX 2020</p>
    </div>
  );
};

export default Footer;
