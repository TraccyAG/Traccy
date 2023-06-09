/* eslint-disable react/jsx-no-duplicate-props */
import SvgSprite from "./utility/SvgSpriteLoader";
import { rotues } from "./routes";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import history from "./common/history";
import AOS from "aos";
import "antd/dist/reset.css";
import "aos/dist/aos.css";

//Svg Sprite
import svgFile from "./assets/images/svg/svg-sprite.svg";
import "./i18nextConf";

function App() {
  useEffect(() => {
    AOS.init({});

    // initCookieyes();

    // return () => {
    //   destroyCookieyes();
    // };
  }, []);

  // const initCookieyes = () => {
  //   const scriptCookieyes = document.getElementById("cookieyes");

  //   if (!scriptCookieyes) {
  //     const script = document.createElement("script");
  //     script.src =
  //       "https://cdn-cookieyes.com/client_data/ac0bb6960675dd563b0b5339/script.js";
  //     script.id = "cookieyes";
  //     document.body.appendChild(script);
  //     console.log('Cookieyes init')
  //   }
  // };

  // const destroyCookieyes = () => {
  //   const scriptCookieyes = document.getElementById("cookieyes");

  //   if (scriptCookieyes) {
  //     document.body.removeChild(scriptCookieyes);
  //     console.log('Cookieyes destroy')
  //   }
  // };

  return (
    <>
      <SvgSprite url={svgFile} />
      <Router
        history={history}
        basename={process.env.REACT_APP_BASENAME || ""}
        // forceRefresh
      >
        {rotues.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={(props) => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              }}
            />
          );
        })}
      </Router>
    </>
  );
}

export default App;
