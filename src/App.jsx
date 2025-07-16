import { useState } from "react";
import "./App.css";
import tableImg from "./images/table.png";
import Header from "./components/Header";
import ImageToggle from "./components/ImageToggle";
import TopInputs from "./components/TopInputs";
import MiddleInputs from "./components/MiddleInputs";
import BottomInputs from "./components/BottomInputs";
import Footer from "./components/Footer";
import BottomButtons from "./components/BottomButtons";
import TopInputsIPv6 from "./components/TopInputsIPv6";
import MiddleInputsIPv6 from "./components/MiddleInputsIPv6";
import BottomInputsIPv6 from "./components/BottomInputsIPv6";
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
            <ImageToggle
                showImage={showImage}
                onToggle={handleToggle}
                tableImg={tableImg}
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
                        />
                        <MiddleInputs
                            renderValue={ipv4Logic.renderValue}
                            handleInputChange={ipv4Logic.handleInputChange}
                            showAnswers={ipv4Logic.showAnswers}
                        />
                        <BottomInputs
                            renderValue={ipv4Logic.renderValue}
                            handleInputChange={ipv4Logic.handleInputChange}
                            showAnswers={ipv4Logic.showAnswers}
                        />
                    </>
                ) : (
                    <>
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
                        : () => {}
                }
                handleCheck={
                    ipVersion === "ipv4" ? ipv4Logic.handleCheck : () => {}
                }
            />
            <Footer />
        </>
    );
}

export default App;
