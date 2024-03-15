import React from "react";

const Header = () => {
  return (
    <div className=" bg-[#E0F4FF] min-h-[700px] flex justify-center rounded-b-3xl">
      <div className="w-[80%] py-14 flex">
        <div className="w-[50%]">
          <h1 className=" text-5xl mb-4 text-[#DA0C81]">
            Mtax
            <span className=" text-[#687EFF]">
              Online Accounting: Payroll Outsourcing
            </span>
          </h1>

          <p className=" text-xl mb-10">
            Mtax เราเป็นหนึ่งบริษัทผู้ให้บริการงานบันทึกบัญชีออนไลน์ (Online
            Accounting) , <br></br>งานด้านบัญชีภาษี (Tax Accounting) ,
            งานด้านบัญชีการเงิน (Financial Accounting) งานด้านบัญชีบริหาร
            (Management Accounting) , งานด้านเงินเดือนพนักงาน (Payroll
            Outsourcing) , จัดตั้งบริษัท (Business Startup)
            เราให้บริการเสมือนเป็นส่วนหนึ่งของทีมกิจการท่าน
            เราพร้อมก้าวเดินและเติบโตไปพร้อมกัน
            เราจะเป็นฟันเฟืองตัวหนึ่งของกิจการ
            เราจะรักษาผลประโยชน์ของกิจการท่านเป็นสิ่งที่เราคำนึงถึงเป็นอันดับแรก
            เรามีทีมงานที่มีคุณภาพและพัฒนาอย่างต่อเนื่องเพื่อพร้อมให้คำปรึกษาและดูแลงานที่
            รับผิดชอบอย่างเต็มประสิทธิภาพ
          </p>
          <div className="flex justify-center w-[90%] ">
            <a href="https://flowaccount.com" target="_blank">
              <img
                className="w-16 h-auto rounded-full mx-3"
                src="images\partner0.jpg"
              />
            </a>
            <a href="https://www.myaccount-cloud.com" target="_blank">
              <img
                className="w-16 h-auto rounded-full mx-3"
                src="images\partner1.jpg"
              />
            </a>
            <a href="https://peakaccount.com/main.html" target="_blank">
              <img
                className="w-16 h-auto rounded-full mx-3"
                src="images\partner5.jpg"
              />
            </a>
            <a href="https://www.tfac.or.th/" target="_blank">
              <img
                className="w-16 h-auto rounded-full mx-3"
                src="images\partner3.jpg"
              />
            </a>
            <a href="https://www.thaitrade.com/home" target="_blank">
              <img
                className="w-16 h-auto rounded-full mx-3"
                src="images\partner4.jpg"
              />
            </a>
            <a
              href="https://ereg.dbd.go.th/ERegistMemberWeb/nonmemberpages/home.xhtml"
              target="_blank"
            >
              <img
                className="w-16 h-auto rounded-full mx-3"
                src="images\partner2.jpg"
              />
            </a>
          </div>

        </div>
        <div className="w-[50%] flex justify-end">
          <img
            className="object-cover w-[80%] h-[80%]  rounded-full hidden md:flex"
            src="images\bussiness.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
