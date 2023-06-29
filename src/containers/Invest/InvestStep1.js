import { Button } from "antd";
import { useHistory } from 'react-router-dom';
import InvestWrapper from "./InvestWrapper";
import "./InvestStep1.scss";
import { useTranslation } from "react-i18next";
import {useTrackedState, useWallet} from "../../contexts/store";

const InvestStep1 = ({ onNext,user }) => {
  const { t } = useTranslation();

  const history = useHistory();
    const handleNext = () => {
    onNext();
  };

  const handleDecline = () => {
    history.push("/");
  };

  return (
      <InvestWrapper>
        <div className="invest-step1-body0">
          <span>Subscription form for participation certificates (Art. 652a in conjunction with Art. 652 OR)</span>
          <span>{t("buy:terms")}</span>

          <div className="invest-document">
            <TermsAndConditions user={user} />
          </div>

          <div className="steps-action">
            <Button type="primary" onClick={() => handleNext()}>
              {t("buy:accept")}
            </Button>

            <Button onClick={() => handleDecline()} className="decline">
              {t("buy:decline")}
            </Button>
          </div>
        </div>
      </InvestWrapper>
  );
};

export default InvestStep1;

const TermsAndConditions = ({user}) => {
    const state = useTrackedState();
    const wallet = useWallet();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US');

    return (
      <span>
      <center>
        <b>Subscription form for participation certificates (Art. 652a in conjunction with Art. 652 OR)</b>
        <br />
        Referring to (i) the Articles of Association of TRACCY CONNECT AG with registered office in Feusisberg (CHE-453.130.488; the "Company") and (ii) the resolution of the Board of Directors of June 12, 2023 to create participation capital from the statutory capital band in Amount of CHF 8,000.00 through the issue of 800,000 participation certificates with a nominal value of CHF 0.01 each, which are made out to the bearer and are to be paid in cash,
        the undersigned undertakes
      </center>
      <br /><br />
      First name / Name: {user.firstName}
      <br />
      Address: {wallet.account}
      <br />
      Acting for: _______________________________________________
      <br />
      [if acting in the name and on account of a legal entity]
      <br />
      for the subscription of {state.investAmount} [number] participation certificates of the company with a nominal value of CHF 0.01 at a price of CHF 0.25 each, as well as for the unconditional and irrevocable payment of the entire subscription amount of CHF {state.investTrcyAmount} [number x CHF 0.25] to the wallet below.
      <br />
      in favor of: Traccy Connect AG, Feusisberg
      <br />
      IBAN: 0xCa7f7606853A7D70386B1C854a9A77Fc72195913
      <br />
      Network: ERC 20
      <br />
      Reference: Participation capital Traccy Connect AG
      <br /><br />
      The newly issued participation certificates are subject to the rights set out in the articles of association of the company. The undersigned hereby requests that his/her participation certificates be deposited at the above address with the custodian.
      <br />
          {formattedDate}
    </span>
  );
};
