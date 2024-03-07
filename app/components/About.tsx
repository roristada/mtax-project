import React from 'react'

const About = () => {
  return (
    <section id="about"className='container mx-auto my-10'>
        <h3 className='flex justify-center opacity-40'>About us</h3>
        <h1 className='flex justify-center text-4xl font-bold opacity-80 mt-3'></h1>

        <div className='flex justify-between items-center mt-12 px-5'>
            <img className='mx-auto'src="images/about1.png" alt="" />
            <div className='w-[50%] flex-col'>
              <h1 className=" text-4xl mb-4 text-[#DA0C81]">Mtax
              <span className=" text-[#687EFF]">
                Online Accounting: Payroll Outsourcing
              </span>
              </h1>            
                <p>สำนักงานก่อตั้งเมื่อปี 2539 ในนาม สำนักงานบัญชี เอ็ม.แท็ค.แอนด์ โซลูชั่น ในรูปแบบคณะบุคคล <br></br>
                  ในปี 2548 ได้เปลี่ยนแปลงเป็นนิติบุคคล ในนามบริษัท เอ็มแท็กซ์ บัญชีออนไลน์ จำกัด ทุนจดทะเบียน 1.0 ล้านบาท <br></br>
                  <p className='font-semibold underline'>นโยบายและพันธกิจของบริษัท</p>
                  1. รักษาความลับลูกค้าโดยเคร่งครัด <br></br>
                  2. รักษาบริการมาตรฐานแห่งวิชาชีพ <br></br>
                  3. ให้บริการลูกค้าด้วยความถูกต้องแม่นยำโดยยึดถือเอกสารหลักฐานเป็นสำคัญ <br></br>
                  4. ให้ถือหลักการทำงานเสมือนสำนักงานเป็นส่วนหนึ่งของทีมเดียวกับธุรกิจของท่าน <br></br>
                  <p className='font-semibold underline'>เป้าหมาย</p>
                  เป็นสำนักงานบัญชีรูปแบบสมัยใหม่ก้าวทันเทคโนยี สำนักงานบัญชี24 ชม. <br></br>
                  ลูกค้าสามารถเข้าถึงข้อมูลได้ทุกอุปกรณ์ all Device</p>
            </div>
            
        </div>
    </section>
  )
}

export default About