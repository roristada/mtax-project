import React from 'react'

const Header = () => {
  return (
    <div className=" bg-[#E0F4FF] min-h-[500px] flex justify-center rounded-b-3xl">
      <div className="w-[80%] py-14 flex">
        <div className="w-[50%]">
          <h1 className=" text-5xl mb-4 text-[#DA0C81]">
            Mtax
            <span className=" text-[#687EFF]">
              Online Accounting: Payroll Outsourcing
            </span>
          </h1>

          <p className=" text-xl mb-10">
            Mtax เราเป็นหนึ่งบริษัทผู้ให้บริการงานบันทึกบัญชีออนไลน์ (Online Accounting) , <br></br>งานด้านบัญชีภาษี (Tax Accounting) , งานด้านบัญชีการเงิน (Financial Accounting) งานด้านบัญชีบริหาร (Management Accounting)
            , งานด้านเงินเดือนพนักงาน (Payroll Outsourcing) , จัดตั้งบริษัท (Business Startup) 
            เราให้บริการเสมือนเป็นส่วนหนึ่งของทีมกิจการท่าน เราพร้อมก้าวเดินและเติบโตไปพร้อมกัน เราจะเป็นฟันเฟืองตัวหนึ่งของกิจการ
            เราจะรักษาผลประโยชน์ของกิจการท่านเป็นสิ่งที่เราคำนึงถึงเป็นอันดับแรก
            เรามีทีมงานที่มีคุณภาพและพัฒนาอย่างต่อเนื่องเพื่อพร้อมให้คำปรึกษาและดูแลงานที่  รับผิดชอบอย่างเต็มประสิทธิภาพ
          </p>
          <div className="flex justify-center w-[90%] ">
            <img
              className=" w-16 h-auto rounded-full mx-3"
              src="images\partner0.jpg"
            />
            <img
              className="w-16 h-auto rounded-full mx-3"
              src="images\partner1.png"
            />
            <img
              className="w-16 h-auto rounded-full mx-3"
              src="images\partner2.jpg"
            />
            <img
              className="w-16 h-auto rounded-full mx-3"
              src="images\partner3.jpg"
            />
          </div>
          <div className="w-[100%] mt-10 flex ">
            <button
              type="button"
              className=" h-12 w-[200px] mr-10 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-3xl text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Services
            </button>
            <button
              type="button"
              className="h-12 w-[200px]  rounded-3xl text-gray-900 bg-white border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-500 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Get Started
            </button>
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
  )
}

export default Header