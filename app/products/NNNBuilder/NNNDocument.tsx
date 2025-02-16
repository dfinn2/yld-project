import React from "react";
import { useForm } from "react-hook-form";

interface NNNDocumentProps {
  businessName: string;
  businessAddress: string;
  manufacturerAddress: string; // Added new prop
  email: string;
  product: string;
  productNameOrTrademark: string;
  skus: string;
  manufacturerNameChinese: string;
  manufacturerNameEnglish: string;
  manufacturerRegistrationNumber: string;
}

const NNNDocument: React.FC<NNNDocumentProps> = ({
  businessName,
  businessAddress,
  manufacturerAddress, // Added new prop
  email,
  product,
  productNameOrTrademark,
  skus,
  manufacturerNameChinese,
  manufacturerNameEnglish,
  manufacturerRegistrationNumber,
}) => {
  const { handleSubmit, watch } = useForm();

  const onSubmit = async (data: any) => {
    console.log("Form submitted:", data);

    // Send data to the server to generate PDF
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();

    // Send the PDF to the user's email if provided
    if (data.email) {
      await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, pdf: blob }),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        id="document-preview"
        className="document-preview w-full bg-white text-black p-6 rounded-lg shadow-lg border border-gray-200 font-serif"
        style={{
          fontFamily: "Noto Serif, serif",
          backgroundColor: "white",
          color: "black",
          margin: "auto",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div
          className="document-preview-page"
          style={{ userSelect: "none", pointerEvents: "none" }}
        >
          <h2 className="text-3xl font-black text-center">NNN AGREEMENT</h2>
          <h3 className="text-lg font-bold text-center">
            Non-Disclosure, Non-Use, & Non-Circumvention Agreement
          </h3>
          <h2 className="text-lg font-bold text-center pb-6">
            （保密、不使用、不规避协议）
          </h2>
          <p>
            This Non‑Disclosure, Non‑Use, and Non‑Circumvention Agreement (the
            “Agreement”) is made and entered into as of{" "}
            <span>[Effective Date]</span> by:
          </p>
          <p>
            本保密、不使用、不规避协议（“本协议”）由下列双方于
            <span>[Effective Date~生效日期]</span>签订：
          </p>
          <div id="particularsWrapper" className="pl-4 pr-4">
            <table className="border-collapse w-full text-sm">
              <tbody>
                <tr>
                  <td className="border border-black p-2 w-1/3">
                    <p>Disclosing Party: </p>
                    <p>披露方: </p>
                  </td>
                  <td className="border border-black p-2 w-full">
                    {" "}
                    <span className="uppercase font-extrabold">
                      {businessName || "Your Business Name"}
                    </span>
                    
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-2 w-1/3">
                    <p>Disclosing Party Address:</p>
                    <p>披露方地址：</p>
                  </td>
                  <td className="border border-black p-2 w-full">
                    <span className="uppercase">
                      {businessAddress || "[Your Business Address]"}
                    </span>
                  </td>
                </tr>
                
                <tr>
                  <td className="border border-black p-2 w-1/3">
                    <p> Receiving Party: </p>
                    <p>接收方： </p>
                  </td>
                  <td className="border border-black p-2 w-full">
                    {" "}
                    <span className="uppercase font-extrabold  bg-yellow-100">
                      {manufacturerNameEnglish || "Manufacturer Name"}
                    </span>
                    <br></br>
                    <span className="uppercase font-extrabold bg-yellow-100">
                      {manufacturerNameChinese || "[Manufacturer Chinese Name]"}
                    </span>
                    
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-2 w-1/3">
                    <p>Receiving Party Address:</p>
                    <p>接收方地址：</p>
                  </td>
                  <td className="border border-black p-2 w-full">
                    <span className="uppercase bg-yellow-100">
                      {manufacturerAddress || "[Manufacturer Address]"}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="border border-black p-2 w-1/3">
                    <p>Registration Number: </p>
                    <p>统一社会信用代码: </p>
                  </td>
                  <td className="border border-black p-2 w-full">
                    {" "}
                    <span className="uppercase font-extrabold  bg-yellow-100">
                      {manufacturerRegistrationNumber || "Manufacturer Registration Number"}
                    </span>
                    <br></br>
                    
                  </td>
                </tr>
                
                <tr>
                  <td className="border border-black p-2">
                    <p></p>
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="helpNote" className="p-3 m-6 bg-red-100 font-mono text-xs">
            Note: For enforcement in China, the Chinese version of this
            Agreement shall be used for purposes of interpretation and execution
            by Chinese courts. This is done in line with best practice and
            should not be changed without legal advice. You can read more about
            this topic in our <a href="#learn">Knowledge Base</a>
          </div>
          <div id="DefinitionsNNN" className="">
            <p>
              <span className="font-semibold">1. Definitions:</span> For the
              purposes of this Agreement, the following terms shall have the
              meanings set forth below:
            </p>
            <p>
              <span className="font-semibold"></span>
            </p>
            <p className="pl-4">
              <span className="font-semibold">“Confidential Information”</span>{" "}
              means all information—whether oral, written, graphic, or
              electronic—disclosed by the Disclosing Party to the Receiving
              Party which is designated as confidential or which, under the
              circumstances, ought to be treated as confidential. This includes,
              without limitation, technical data, trade secrets, know‑how,
              business plans, customer data, pricing, product images, designs,
              files, and other proprietary or confidential information.
            </p>
            <p className="pl-4">
              <span className="font-semibold">定义 中文：</span>
              就本协议而言，下列术语具有如下含义：
            </p>
            <p className="pl-4">
              <span className="font-semibold">“保密信息”</span>{" "}
              指披露方向接收方披露的所有信息（无论为口头、书面、图形或电子形式），该信息被指定为保密信息或在相关情形下应被视为保密信息，包括但不限于技术数据、商业机密、专有技术、商业计划、客户资料、定价、产品图片、设计、文件以及其他具有专有性或保密性质的信息。
            </p>
            <p className="pl-4">
              <span className="font-semibold">“Purpose”</span> means the
              evaluation and potential establishment of a business relationship
              or transaction between the parties.
            </p>
            <p className="pl-4 mb-3">
              <span className="font-semibold">“目的”</span>{" "}
              指双方为评估及可能建立业务关系或交易而进行的信息交流。
            </p>
            <p className="pl-4">
              <span className="font-semibold">“Non‑Use”</span> means the
              obligation of the Receiving Party to use the Confidential
              Information solely for the Purpose and for no other purpose.
            </p>{" "}
            <p className="pl-4 mb-3">
              <span className="font-semibold">“不得使用”</span>{" "}
              指接收方仅为实现“目的”而使用保密信息，不得用于其他任何用途的义务。
            </p>
            <p className="pl-4">
              <span className="font-semibold">“Non‑Circumvention”</span> means
              the obligation of the Receiving Party not to bypass or otherwise
              undermine the interests of the Disclosing Party regarding any
              business opportunity or transaction disclosed, whether directly or
              indirectly.
            </p>
            <p className="pl-4 mb-3">
              <span className="font-semibold">“不得规避”</span>{" "}
              指接收方不得以任何方式规避、回避、绕过或削弱披露方就任何直接或间接披露的商业机会或交易所享有的利益的义务。
            </p>
            <p className="pl-4">
              <span className="font-semibold">“Molds”</span> means any physical
              prototypes, manufacturing molds, dies, or related tangible items
              provided by the Disclosing Party that embody or incorporate
              Confidential Information.
            </p>
            <p className="pl-4 mb-3">
              <span className="font-semibold">“模具”</span>{" "}
              指披露方提供的任何物理原型、制造模具、冲模或其他包含或体现保密信息的有形物品。
            </p>
            <p className="pl-4">
              <span className="font-semibold">“Group Companies”</span> means any
              entity that directly or indirectly controls, is controlled by, or
              is under common control with a party, including subsidiaries,
              affiliates, parent companies, and other related companies.
            </p>
            <p className="pl-4 mb-3">
              <span className="font-semibold">“集团或关联公司”</span>{" "}
              指直接或间接控制、被控制或与一方处于共同控制下的任何实体，包括子公司、关联公司、母公司及其他相关公司。
            </p>
            <p className="pl-4">
              <span className="font-semibold">
                “Underlying Manufacturing Relationship”
              </span>{" "}
              means the manufacturing arrangement or collaboration between the
              parties, under which Confidential Information may be disclosed.
            </p>
            <p className="pl-4 mb-3">
              <span className="font-semibold">“基础制造关系”</span>{" "}
              指双方之间就制造事宜而建立的合作或安排，在该合作关系中可能会披露保密信息。
            </p>
          </div>
          <div id="ConfidentialityObligations" className="">
            <p>
              <span className="font-semibold">
                2. Confidentiality Obligations / 保密义务
              </span>
            </p>
            <div className="pl-4 mb-2">
              The Receiving Party, including its Group Companies, shall:
              <p className="pl-4">
                (i) maintain the confidentiality of all Confidential
                Information;
              </p>
              <p className="pl-4">
                (ii) not disclose, publish, or disseminate any Confidential
                Information to any third party without the prior written consent
                of the Disclosing Party; and{" "}
              </p>
              <p className="pl-4">
                (iii) protect the Confidential Information with no less than the
                degree of care it uses to protect its own confidential
                information (and in no event less than a reasonable standard of
                care).
              </p>
            </div>
            
            <p>   接收方及其集团或关联公司应当：</p>
              <p className="pl-4">(i) 对所有保密信息严格保密；</p>
              <p className="pl-4">(ii) 未经披露方事先书面同意，不得向任何第三方披露、发布或传播保密信息；</p>
              <p className="pl-4">(iii) 采取不少于其保护自身保密信息所使用的措施（且无论如何不得低于合理注意标准）来保护保密信息。</p>
            
          </div>
          <div id="NonUse" className="">
            <p>
              <span className="font-semibold">3. Non‑Use / 不得使用</span>
            </p>
            <p className="pl-4 blur-sm">
              English: The Receiving Party agrees that it shall use the
              Confidential Information solely for the Purpose. The Confidential
              Information remains the exclusive property of the Disclosing
              Party, and nothing in this Agreement shall be construed as
              granting any license or other rights to the Receiving Party.
            </p>
            <p className="pl-4 blur-sm">
              中文：
              接收方同意，仅为实现“目的”而使用保密信息。保密信息仍为披露方的专有财产，本协议中的任何内容均不得解释为向接收方授予任何许可或其他权利。
            </p>
          </div>
          <div id="NonCircumvention" className="">
            <p>
              <span className="font-semibold">
                4. Non‑Circumvention / 不得规避
              </span>
            </p>
            <p className="pl-4 blur-sm">
              The Receiving Party shall not circumvent, avoid, bypass, or
              otherwise undermine the interests of the Disclosing Party with
              respect to any business opportunity or transaction disclosed,
              whether directly or indirectly. The Receiving Party further agrees
              not to initiate or conduct any negotiations or enter into any
              agreements with any party introduced by the Disclosing Party
              without the Disclosing Party’s prior written consent.
            </p>
            <p className="pl-4 blur-sm">
              中文：
              接收方不得对披露方直接或间接披露的任何商业机会或交易采取规避、回避、绕过或其他削弱披露方利益的行为。接收方进一步同意，未经披露方事先书面同意，不得与披露方介绍的任何第三方启动或进行谈判或签订任何协议。
            </p>
          </div>
          <div id="PenaltyDamages" className="">
            <p>
              <span className="font-semibold">
                5. Penalty Damages / 违约金条款
              </span>
            </p>
            <p className="pl-4">
              English: (a) The Parties acknowledge that any breach of this
              Agreement may cause significant harm to the Disclosing Party, and
              that a pre‑agreed liquidated damages (违约金) provision is an
              appropriate measure in the event of a breach. Notwithstanding the
              foregoing, any penalty damages shall be subject to reduction by a
              Chinese court if found to be excessive relative to the actual loss
              incurred.
            </p>
            <p className="pl-4">
              (b) The Parties may elect one of the following penalty damages
              formulas (please initial the chosen option): Option A – Fixed
              Amount:  For each breach, the Receiving Party shall pay a fixed
              sum of RMB [insert fixed amount]. Option B – Percentage of
              Contract Value:  For each breach, the Receiving Party shall pay
              penalty damages equal to [insert percentage, e.g., 5%] of the
              total value of the affected transaction or contract. Option C –
              Multiple of Actual Loss:  For each breach, the Receiving Party
              shall pay an amount equal to [insert multiplier, e.g., “2×”] the
              actual loss incurred by the Disclosing Party, as reasonably
              determined in accordance with applicable Chinese law.
            </p>
            <p className="pl-4">
              (c) The Parties acknowledge that the amounts specified represent a
              genuine pre‑estimate of potential loss; however, if a court
              determines that such amounts are excessive relative to the actual
              harm, the payable amount may be reduced accordingly.
            </p>
            <p className="pl-4">
              中文： (a)
              双方确认，违反本协议可能会给披露方造成重大损害，因此约定预先计算的违约金条款为违约时适当的补救措施。尽管如此，如中国法院认定约定的违约金与实际损失相比过高，则有权予以适当减少。
            </p>
            <p className="pl-4">
              (b) 双方可选择下列违约金计算方式之一（请在所选方案旁签字确认）：
              方案 A – 固定金额：
               每次违约时，接收方应向披露方支付固定金额人民币 [填写具体金额]。
              方案 B – 合同金额百分比：
               每次违约时，接收方应支付违约金，金额相当于受违约影响的交易或合同总金额的
              [填写百分比，例如5%]。 方案 C – 实际损失倍数：
               每次违约时，接收方应支付的违约金为披露方因违约而实际遭受损失的
              [填写倍数，例如“2倍”]（该损失应依据适用的中国法律合理确定）。
            </p>
            <p className="pl-4">
              (c)
              双方确认，上述金额为对可能损失的真实预估；但如法院认定违约金显著高于实际损失，支付金额可相应予以调整。
            </p>
          </div>
          <div id="ReturnAndDestructionOfMolds" className="">
            <p>
              <span className="font-semibold">
                6. Return and Destruction of Molds / 模具的归还与销毁
              </span>
            </p>
            <p className="pl-4">
              English: (a) Upon termination of this Agreement or upon the
              written request of the Disclosing Party, the Receiving Party
              shall, at the Disclosing Party’s expense and direction,
              immediately return all molds and related materials containing
              Confidential Information.
            </p>
            <p className="pl-4">
              (b) If the return of such molds is not feasible, the Receiving
              Party shall, following the Disclosing Party’s instructions,
              destroy such molds and certify in writing within [number] days
              that destruction has been completed.
            </p>
            <p className="pl-4">
              (c) This obligation shall survive the termination of this
              Agreement.
            </p>
            <p className="pl-4">
              中文： (a)
              在本协议终止时或经披露方书面要求，接收方应按照披露方的指示，并由披露方承担费用，立即归还所有包含保密信息的模具及相关资料。
            </p>
            <p className="pl-4">
              (b)
              若模具无法归还，接收方应依照披露方的指示销毁该模具，并在[填写天数]天内以书面形式出具销毁证明，确认已完成销毁。
            </p>
            <p className="pl-4">(c) 此项义务在本协议终止后仍然有效。</p>
          </div>
          <div id="CoverageForGroupOrRelatedCompanies" className="">
            <p>
              <span className="font-semibold">
                7. Coverage for Group or Related Companies /
                集团或关联公司的适用范围
              </span>
            </p>
            <p className="pl-4">
              English: This Agreement shall be binding upon and benefit the
              parties and their respective Group Companies. The Receiving Party
              shall ensure that all such Group Companies are aware of and comply
              with the confidentiality, non‑use, and non‑circumvention
              obligations contained herein. Any breach by a Group Company shall
              be deemed a breach by the Receiving Party.
            </p>
            <p className="pl-4">
              中文：
              本协议对双方及其各自的集团或关联公司均具有约束力并使其受益。接收方应确保所有此类集团或关联公司知悉并遵守本协议中关于保密、不得使用及不得规避的各项义务。任何集团或关联公司的违反均视为接收方的违反。
            </p>
          </div>
          <div id="TermAndTermination" className="">
            <p>
              <span className="font-semibold">
                8. Term and Termination / 期限及终止
              </span>
            </p>
            <p className="pl-4">
              (a) This Agreement shall commence on the Effective Date and remain
              in effect for a period of [Term] years unless terminated earlier
              by either party upon providing [Number] days’ prior written
              notice.<br></br> 
              (a) 本协议自生效日起生效，并持续有效 [填写期限]
              年，除非任一方提前以书面形式通知对方（提前通知期限为 [填写天数]
              天）而提前终止本协议。<br></br>
              (b) Notwithstanding termination, the obligations
              regarding Confidential Information, Non‑Use, Non‑Circumvention,
              return and destruction of molds, and payment of penalty damages
              shall survive for [Duration] years from the date of termination.<br></br>
              (b)
              尽管本协议终止，关于保密、不得使用、不得规避、模具归还与销毁以及违约金支付的义务自终止之日起继续存续
              [填写期限] 年。
            </p>
            
          </div>
          <div id="GoverningLawAndDisputeResolution" className="">
            <p>
              <span className="font-semibold">
                9. Governing Law and Dispute Resolution / 适用法律与争议解决
              </span>
            </p>
            <p className="pl-4">
              (a) This Agreement shall be governed by and construed in
              accordance with the laws of the People’s Republic of China.{" "}
              <br></br>
              (a) 本协议受中华人民共和国法律管辖并依其解释。 <br></br>
              (b) Any dispute or claim arising out of or relating to
              this Agreement, including its interpretation, performance, or
              breach, shall be submitted to the competent People’s Court located
              in [City, e.g., Beijing or Shanghai] in the People’s Republic of
              China. <br></br>
              (b)
              任何因本协议引起或与本协议有关的争议或索赔（包括其解释、履行或违反），均应提交中华人民共和国
              [填写城市，例如北京或上海] 有管辖权的人民法院解决。 <br></br>
              (c) Notwithstanding any provision to the contrary,
              for any disputes adjudicated in Chinese courts, the Chinese
              language version of this Agreement shall prevail.
              (c)
              尽管本协议中有其他规定，凡由中国法院审理的争议，以本协议中文版本为准。
            </p>
          </div>
          <div id="LanguageAndInterpretation" className="">
            <p>
              <span className="font-semibold">
                10. Language and Interpretation / 语言及解释
              </span>
            </p>
            <p className="pl-4">
              English: This Agreement is executed in both English and Chinese.
              For the purpose of interpretation and enforcement by Chinese
              courts, the Chinese version shall be deemed the controlling
              language. However, the English version is provided solely for
              convenience.
            </p>
            <p className="pl-4">
              中文：
              本协议以英文和中文两种语言签订。为便于中国法院解释及执行，本协议以中文版本为准，但提供英文版本仅为方便之用。
            </p>
          </div>
          <div id="RemediesAndInjunctiveRelief" className="">
            <p>
              <span className="font-semibold">
                11. Remedies and Injunctive Relief / 救济措施与禁令救济
              </span>
            </p>
            <p className="pl-4">
              <span>
                (a) The Receiving Party acknowledges that any breach of this
                Agreement may cause irreparable harm to the Disclosing Party,
                for which monetary damages may not be adequate.
              </span>
              <br></br>
              <span>
                (b) In addition to any other rights or remedies available under
                applicable law, the Disclosing Party shall be entitled to seek
                injunctive relief, specific performance, or any other equitable
                remedy to prevent or curtail any breach or threatened breach of
                this Agreement.{" "}
              </span>
              <br></br>
              <span>
                (c) The right to recover penalty damages as provided in Section
                5 is cumulative and shall not preclude the Disclosing Party from
                pursuing any other remedy available under applicable law.
              </span>
            </p>
            <p className="pl-4">
              <span>
                (a)
                接收方承认，违反本协议可能对披露方造成无法弥补的损害，而金钱赔偿可能不足以弥补该损害。
              </span>
              <br></br>
              <span>
                (b)
                除适用法律规定的其他权利或救济外，披露方有权寻求禁令救济、特定履行或其他衡平法上的救济措施，以防止或制止任何违反或威胁违反本协议的行为。
              </span>
              <br></br>
              <span>
                (c)
                根据第5条规定追讨违约金的权利具有累积性，不影响披露方依据适用法律寻求其他救济的权利。
              </span>
              <br></br>
            </p>
          </div>
          <div id="EntireAgreement" className="">
            <p>
              <span className="font-semibold">
                12. Entire Agreement / 完整协议
              </span>
            </p>
            <p className="pl-4">
              English: This Agreement constitutes the entire agreement between
              the parties with respect to its subject matter and supersedes all
              prior or contemporaneous understandings, agreements, or
              communications, whether written or oral.
            </p>
            <p className="pl-4">
              中文：
              本协议构成双方就其标的事项达成的完整协议，并取代所有先前或同时存在的口头或书面谅解、协议或沟通。
            </p>
          </div>
          <div id="Amendments" className="">
            <p>
              <span className="font-semibold">13. Amendments / 修改</span>
            </p>
            <p className="pl-4">
              English: Any amendment or modification of this Agreement must be
              in writing and signed by duly authorized representatives of both
              parties.
            </p>
            <p className="pl-4">
              中文：
              本协议的任何修改或变更均须以书面形式作出，并经双方授权代表签署。
            </p>
          </div>
          <div id="Counterparts" className="">
            <p>
              <span className="font-semibold">14. Counterparts / 副本</span>
            </p>
            <p className="pl-4">
              English: This Agreement may be executed in counterparts, each of
              which shall be deemed an original, and all of which together shall
              constitute one and the same instrument.
            </p>
            <p className="pl-4">
              中文：
              本协议可签署多份副本，每份副本均视为正本，所有副本合在一起构成同一份文件。
            </p>
          </div>
          <div id="Severability" className="">
            <p>
              <span className="font-semibold">15. Severability / 可分割性</span>
            </p>
            <p className="pl-4">
              English: If any provision of this Agreement is held to be invalid
              or unenforceable, such provision shall be reformed only to the
              extent necessary to render it enforceable, and the remaining
              provisions shall continue in full force and effect.
            </p>
            <p className="pl-4">
              中文：
              若本协议中的任何条款被认定为无效或不可执行，则该条款仅在必要范围内修改以使之可执行，其余条款继续完全有效。
            </p>
          </div>
          <div id="DestructionOfConfidentialInformation" className="">
            <p>
              <span className="font-semibold">
                16. Destruction of Confidential Information Upon Termination of
                the Underlying Manufacturing Relationship /
                基础制造关系终止时销毁保密信息
              </span>
            </p>
            <p className="pl-4">
              Upon termination of the Underlying Manufacturing Relationship, the
              Receiving Party shall, at its own cost and without undue delay,
              destroy all Confidential Information of the Disclosing Party in
              its possession or control. This includes, without limitation,
              product images, designs, files, documents, and any other
              information that by its nature is confidential or proprietary to
              the Disclosing Party. The Receiving Party shall provide written
              certification to the Disclosing Party within [number] days of such
              termination confirming that all such Confidential Information has
              been destroyed and that no copies, excerpts, or reproductions
              thereof remain.
            </p>
            <p className="pl-4">
              在基础制造关系终止后，接收方应在自身费用承担下并在合理时间内销毁其所持有或控制的披露方所有保密信息，包括但不限于产品图片、设计、文件、资料及任何其他本质上对披露方具有保密性或专有性的资料。接收方应在终止后[填写天数]天内向披露方提供书面证明，确认所有此类保密信息已被销毁，且其控制或持有的任何复制件、摘录或复印件均已清除。
            </p>
          </div>
          <div id="ManufacturersStampWarranty" className="">
            <p>
              <span className="font-semibold">
                17. Manufacturer’s Stamp Warranty / 制造商印章保证
              </span>
            </p>
            <p className="pl-4">
              English: The Receiving Party warrants and represents that any
              stamp, seal, or mark affixed by the manufacturer or on behalf of
              the manufacturer under this Agreement has been, or will be,
              affixed solely by an individual duly authorized by the
              manufacturer to do so. The Receiving Party further undertakes to
              indemnify and hold harmless the Disclosing Party from and against
              any losses, damages, or liabilities arising from any claim that
              such stamp was affixed by a person lacking sufficient authority.
            </p>
            <p className="pl-4">
              中文：
              接收方保证并声明，根据本协议由制造商或代表制造商所加盖的任何印章、封印或标记，均由制造商授权的人员所加盖或将由其加盖。接收方进一步承诺，如因制造商印章被未获得充分授权的人员加盖而引起任何索赔，导致披露方遭受任何损失、损害或责任，接收方应赔偿并使披露方免受损害。
            </p>
          </div>
          <div id="signature-wrapper" className="">
            <p>
              <span className="font-semibold">
                IN WITNESS WHEREOF / 签署证明
              </span>
            </p>
            <p className="pl-4">
              English: In witness whereof, the parties have executed this
              Agreement as of the date first above written.
            </p>
            <p className="pl-4">
              中文： 为此，双方已于上述首个书面日期签署本协议，以昭信守。
            </p>
            <p className="pl-4">[DISCLOSING PARTY NAME] / [披露方名称]</p>
            <p className="pl-4">
              By: ___________________________ 签字：_________________________
            </p>
            <p className="pl-4">
              Name: _________________________ 姓名：_________________________
            </p>
            <p className="pl-4">
              Title: __________________________ 职务：_________________________
            </p>
            <p className="pl-4">
              Date: ___________________________ 日期：_________________________
            </p>
            <p className="pl-4">[RECEIVING PARTY NAME] / [接收方名称]</p>
            <p className="pl-4">
              {" "}
              (please sign and affix seal 请签署并加盖公司公章) By:
              ___________________________ 签字：_________________________
            </p>
            <p className="pl-4">
              Name: _________________________ 姓名：_________________________
            </p>
            <p className="pl-4">
              Title: __________________________ 职务：_________________________
            </p>
            <p className="pl-4">
              Date: ___________________________ 日期：_________________________
            </p>
            <table className="border-collapse w-full">
              <tbody>
              <tr>
                <td className="border border-black p-2 w-2/3"> </td>
                <td className="border border-black p-2 w-1/3">
                  <img
                    className="opacity-20"
                    src="../images/stamp_spot.svg"
                    alt="Stamp Spot"
                  />{" "}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <p>
            Manufacturer Name (English): {manufacturerNameEnglish}
          </p>
          <p>
            Manufacturer Name (Chinese): {manufacturerNameChinese}
          </p>
          <p>
            Manufacturer Registration Number: {manufacturerRegistrationNumber}
          </p>
        </div>
      </div>
      <button type="submit">Buy Now</button>
    </form>
  );
};

export default NNNDocument;
