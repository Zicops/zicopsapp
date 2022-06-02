const CongratulationsScreen = ({ children }) => {
  return (
    <>
      <div className="congratulations_Screen">
        {/* <div className="background_img">{children}</div> */}
        {children}
      </div>
      <style jsx>
        {`
          .congratulations_Screen {
            width: 100%;
            height: 400px;
            background-color: #323232;
            padding: 30px 50px;
            box-shadow: 0px 10px 20px 5px rgba(0, 0, 0, 0.2);
            background-image: url('/images/svg/Union.svg');
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 290px;
          }
          // .background_img {
          //   height: 300px;
          //   background-image: url('/images/svg/Union.svg');
          //   background-position: center center;
          //   background-repeat: no-repeat;
          //   background-size: contain;
          // }
        `}
      </style>
    </>
  );
};

export default CongratulationsScreen;
