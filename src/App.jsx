import React, { useState } from "react";
import "./App.css";
import tableImg from "./images/table.png";
import ipv6StructureImg from "./images/ipv6_struktur.jpg";
import Header from "./components/Header";
import ToggleElements from "./components/ToggleElements"; // Updated import name
import TopInputs from "./components/TopInputs";
import MiddleInputs from "./components/MiddleInputs";
import BottomInputs from "./components/BottomInputs";
import Footer from "./components/Footer";
import BottomButtons from "./components/BottomButtons";
import TopInputsIPv6 from "./components/TopInputsIPv6";
import MiddleInputsIPv6 from "./components/MiddleInputsIPv6";
import BottomInputsIPv6 from "./components/BottomInputsIPv6";
import InstructionContainer from "./components/InstructionContainer";
import IpVersionButtons from "./components/IpVersionButtons";
import { useIPv4 } from "./hooks/useIpv4";
import { useIPv6 } from "./hooks/useIpv6";

function App() {
    const [ipVersion, setIpVersion] = useState("ipv4");
    const [showImage, setShowImage] = useState(false);

    const ipv4Logic = useIPv4();
    const ipv6Logic = useIPv6();

    const handleToggle = () => setShowImage((prev) => !prev);

    return (
        <>
            <Header />
            <ToggleElements
                showImage={showImage}
                onToggle={handleToggle}
                tableImg={ipVersion === "ipv6" ? ipv6StructureImg : tableImg}
                ipVersion={ipVersion}
            />

            <IpVersionButtons
                ipVersion={ipVersion}
                attention={
                    ipVersion === "ipv4"
                        ? ipv4Logic.attention
                        : ipv6Logic.attention
                }
                setAttention={
                    ipVersion === "ipv4"
                        ? ipv4Logic.setAttention
                        : ipv6Logic.setAttention
                }
                handleStartIPv4={() => {
                    setIpVersion("ipv4");
                    ipv4Logic.handleStart();
                }}
                handleStartIPv6={() => {
                    setIpVersion("ipv6");
                    ipv6Logic.handleStart();
                }}
            />

            <main>
                {ipVersion === "ipv4" ? (
                    <>
                        <InstructionContainer
                            generatedField={ipv4Logic.generatedField}
                            ipData={ipv4Logic.ipData}
                            isInputMode={ipv4Logic.userIsInputting}
                            isValidIp={ipv4Logic.ipValid}
                            hasInputStarted={ipv4Logic.hasInputStarted}
                            showAnswers={ipv4Logic.showAnswers}
                            cidrValid={ipv4Logic.cidrValid}
                            subnetMaskValid={ipv4Logic.subnetMaskValid}
                            checkResults={ipv4Logic.checkResults}
                            showCheckResults={ipv4Logic.showCheckResults}
                        />
                        <TopInputs
                            ipData={ipv4Logic.ipData}
                            mode={ipv4Logic.mode}
                            handleInputChange={ipv4Logic.handleInputChange}
                            onIpInput={ipv4Logic.handleIpInput}
                            onCidrOrMaskInput={ipv4Logic.handleCidrOrMaskInput}
                            ipValid={ipv4Logic.ipValid}
                            cidrValid={ipv4Logic.cidrValid}
                            subnetMaskValid={ipv4Logic.subnetMaskValid}
                            attention={ipv4Logic.attention}
                            userInput={ipv4Logic.userInput}
                            generated={ipv4Logic.generated}
                            userIsInputting={ipv4Logic.userIsInputting}
                            generatedField={ipv4Logic.generatedField}
                            renderValue={ipv4Logic.renderValue}
                        />
                        <MiddleInputs
                            renderValue={ipv4Logic.renderValue}
                            handleInputChange={ipv4Logic.handleInputChange}
                            showAnswers={ipv4Logic.showAnswers}
                            generatedField={ipv4Logic.generatedField}
                        />
                        <BottomInputs
                            renderValue={ipv4Logic.renderValue}
                            handleInputChange={ipv4Logic.handleInputChange}
                            showAnswers={ipv4Logic.showAnswers}
                            generatedField={ipv4Logic.generatedField}
                        />
                    </>
                ) : (
                    <>
                        <InstructionContainer
                            ipVersion="ipv6"
                            ipData={ipv6Logic.ipData}
                            mode={ipv6Logic.mode}
                            showAnswers={ipv6Logic.showAnswers}
                            checkResults={ipv6Logic.checkResults}
                            showCheckResults={ipv6Logic.showCheckResults}
                        />
                        <TopInputsIPv6
                            ipData={ipv6Logic.ipData}
                            renderValue={ipv6Logic.renderValue}
                            handleInputChange={ipv6Logic.handleInputChange}
                            showAnswers={ipv6Logic.showAnswers}
                            mode={ipv6Logic.mode}
                        />
                        <MiddleInputsIPv6
                            renderValue={ipv6Logic.renderValue}
                            handleInputChange={ipv6Logic.handleInputChange}
                            showAnswers={ipv6Logic.showAnswers}
                            mode={ipv6Logic.mode}
                        />
                        <BottomInputsIPv6
                            renderValue={ipv6Logic.renderValue}
                            handleInputChange={ipv6Logic.handleInputChange}
                            showAnswers={ipv6Logic.showAnswers}
                        />
                    </>
                )}
            </main>
            <BottomButtons
                handleShowAnswers={
                    ipVersion === "ipv4"
                        ? ipv4Logic.handleShowAnswers
                        : ipv6Logic.handleShowAnswers // Updated to include IPv6 functionality
                }
                handleCheck={
                    ipVersion === "ipv4"
                        ? ipv4Logic.handleCheck
                        : ipv6Logic.handleCheck // Updated to include IPv6 functionality
                }
                attention={
                    ipVersion === "ipv4"
                        ? ipv4Logic.bottomButtonsAttention
                        : ipv6Logic.bottomButtonsAttention
                }
                disabled={
                    ipVersion === "ipv4"
                        ? // Disable if no generated data OR in Eingabe Modus
                          !ipv4Logic.ipData.ip || ipv4Logic.userIsInputting
                        : // Disable if no generated IPv6 data
                          !ipv6Logic.ipData.ipv6
                }
            />
            <Footer />
        </>
    );
}

export default App;
