function MobileGifDragDrop() {
  const styles = {
    svgContainer: {
      width: "100px",
      height: "100px",
    },
    utveckling: {
      animation: "Utveckling 6.5s infinite",
      strokeWidth: "10",
      fill: "none",
      stroke: "#cc6969",
    },
    pil: {
      animation: "Pil 6.5s infinite",
    },
    bock: {
      animation: "Bock 6.5s infinite",
      fill: "none",
      strokeDasharray: "31 82",
      strokeLinecap: "butt",
      strokeLinejoin: "miter",
      strokeMiterlimit: "4",
      strokeWidth: "4",
      stroke: "#ffffff",
    },
    blueCircle: {
      opacity: "1",
      fill: "#2da551",
      fillOpacity: "1",
      stroke: "none",
      strokeWidth: "12.9174",
    },
    arrowPath: {
      fill: "none",
      stroke: "#ffffff",
      strokeWidth: "3.8",
      strokeLinecap: "round",
      strokeLinejoin: "miter",
      strokeOpacity: "1",
      strokeMiterlimit: "4",
      strokeDasharray: "none",
    },
  };

  return (
    <div style={styles.svgContainer}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <style>
          {`
            @keyframes Pil {
              0% { transform: translateY(0); }
              6% { transform: translateY(-65px); }
              62.49% { transform: translateY(-65px); }
              62.5% { transform: translateY(65px); }
              68.5% { transform: translateY(0px); }
            }
            @keyframes Utveckling {
              0% { stroke-width: 10; }
              3.1% { stroke-width: 10; stroke-dasharray: 1 179; }
              3.6% { stroke-width: 25; stroke-dasharray: 1 179; }
              28% { stroke-width: 25; stroke-dasharray: 174 179; }
              34% { stroke-width: 10; stroke-dasharray: 179 179; }
              100% { stroke-width: 10; stroke-dasharray: 179 179; }
            }
            @keyframes Bock {
              0% { stroke-dasharray: 1 82; stroke-dashoffset: 0px; }
              29% { stroke-dasharray: 1 82; stroke-dashoffset: 0px; }
              35% { stroke-dasharray: 31 82; stroke-dashoffset: -50px; }
              62% { stroke-dasharray: 31 82; stroke-dashoffset: -50px; transform: translateY(0px); }
              68% { stroke-dasharray: 31 82; stroke-dashoffset: -50px; transform: translateY(-65px); }
              100% { stroke-dasharray: 31 82; stroke-dashoffset: -50px; transform: translateY(-65px); }
            }
          `}
        </style>
        <defs>
          <clipPath id="clipIt">
            <circle fill="black" r="35" cy="50" cx="50" />
          </clipPath>
        </defs>
        <path
          style={styles.utveckling}
          d="M 49.99955,21.646452 A 28.35355,28.353548 0 0 0 21.646,50
          28.35355,28.353548 0 0 0 49.99955,78.353548
          28.35355,28.353548 0
          0 0 78.3531,50 28.35355,28.353548 0 0 0 49.99955,21.646452
          Z"
        />
        {/* @ts-ignore */}
        <g style={styles.cut} clipPath="url(#clipIt)">
          <circle r="35" cy="50" cx="50" style={styles.blueCircle} />

          <g style={styles.pil}>
            <path
              d="m 40.056531,47.971893 9.914191,-9.514425 9.994144,9.514425"
              //   @ts-ignore
              style={styles.arrowPath}
            />
            <path
              d="M 49.970722,38.457468 V 61.56393"
              //   @ts-ignore
              style={styles.arrowPath}
            />
          </g>

          <path
            // @ts-ignore
            style={styles.bock}
            d="m 49.533063,13 c 0,0
            -4.038975,0.243204 -7.084664,1.6
            -10.965877,4.88509 -12.03936,12.900449
            -12.029016,15.995361 0.02524,7.552595
            4.607455,12.168562 6.129905,13.956538 C
            41.41924,50.271203 47.447623,56.491
            47.447623,56.491 L 63.320719,42.911532"
          />
        </g>
      </svg>
    </div>
  );
}

export default MobileGifDragDrop;
