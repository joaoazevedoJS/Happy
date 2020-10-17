import React from "react";

import Shimmer from "../../components/Shimmer";
import Sidebar from "../../components/Sidebar";

import "../../styles/shimmer/loadingOrphanage.css";

function LoadingOrphanage() {
  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <Shimmer>
            <div className="shimmer-effect main-img"></div>

            <div className="images">
              <div className="shimmer-effect btn-img"></div>
              <div className="shimmer-effect btn-img"></div>
              <div className="shimmer-effect btn-img"></div>
              <div className="shimmer-effect btn-img"></div>
              <div className="shimmer-effect btn-img"></div>
              <div className="shimmer-effect btn-img"></div>
            </div>

            <div className="orphanage-details-content">
              <div className="shimmer-effect shimmer-title"></div>
              <div className="shimmer-effect shimmer-text"></div>
              <div className="shimmer-effect shimmer-text"></div>
              <div className="shimmer-effect shimmer-text"></div>

              <div className="map-container">
                <div
                  className="shimmer-effect"
                  style={{ width: "100%", height: 280 }}
                ></div>

                <div className="shimmer-effect footer-map"></div>
              </div>

              <hr />

              <div className="shimmer-effect shimmer-title"></div>
              <div className="shimmer-effect shimmer-text"></div>
              <div className="shimmer-effect shimmer-text"></div>

              <div className="open-details">
                <div className="shimmer-effect hours"></div>
                <div className="shimmer-effect hours"></div>
              </div>
            </div>
          </Shimmer>
        </div>
      </main>
    </div>
  );
}

export default LoadingOrphanage;
