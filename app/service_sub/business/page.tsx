import React from 'react';
import Link from "next/link";

const businesspage = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div className="lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-8 font-medium text-gray-900 text-center">Business Startup</h1>
          <div className="lg:flex justify-center items-start w-full mb-10 px-4">
            <div className="lg:w-1/2 w-full mb-10 px-20">
              <p className="mb-8 leading-relaxed font-medium semibold">ข้อมูลสำหรับผู้ประกอบการใหม่: <br></br>
                <a href="\pdf\jodtabian.pdf" target="_blank" className="underline">- ขั้นตอนการจดทะเบียน</a> <br></br>
                <a href="\pdf\b2.pdf" target="_blank" className="underline">- ค่าใช้จ่ายจัดตั้งบริษัท</a> <br></br>
                <a href="\pdf\b3.pdf" target="_blank" className="underline">- ค่าใช้จ่าย​จัดตั้งห้างหุ้นส่วนจำกัด</a> <br></br>
                <a href="https://ereg.dbd.go.th/ERegistMemberWeb/nonmemberpages/home.xhtml" target="_blank" className="underline">- จดทะเบียนทางอินเทอร์เน็ต</a> <br></br>
                <a href="https://www.dbd.go.th/ewt_news.php?nid=941&filename=index" target="_blank" className="underline">- ดาวน์โหลดแบบฟอร์ม</a> <br></br>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeJC_a8C9i7ixBSalrmzCY_UutGleu0nkbPaXjvRno6lC0gAA/viewform" target="_blank" className="underline">- จองชื่อนิติบุคคล (ฟรี)</a> <br></br>
              </p>
              <p className="mb-8 leading-relaxed font-medium">ข้อมูลสำหรับผู้เสียภาษี: <br></br>
                <a href="\pdf\b4.pdf" target="_blank" className="underline">- เริ่มแรกสำหรับผู้เสียภาษี</a> <br></br>
                <a href="\pdf\b5.pdf" target="_blank" className="underline">- เอกสารที่ต้องใช้จด VAT</a> <br></br>
                <a href="https://vsreg.rd.go.th/jsp/MainFVATFSBT.jsp" target="_blank" className="underline">- จดทะเบียนทางอินเทอร์เน็ต</a> <br></br>
                <a href="https://www.rd.go.th/publish/22368.html" target="_blank" className="underline">- ดาวน์โหลดแบบฟอร์ม</a> <br></br>
                <a href="\pdf\b6.pdf" target="_blank" className="underline">- ค่าบริการจดทะเบียน</a> <br></br>
              </p>
            </div>
            <div className="lg:w-1/2 w-full mb-10 px-8 lg:ml-8">
              <img src="\images\businesssss.jpg" alt="Your Image" className="object-cover object-center rounded-lg" style={{ width: "400px", height: "400px" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default businesspage;
