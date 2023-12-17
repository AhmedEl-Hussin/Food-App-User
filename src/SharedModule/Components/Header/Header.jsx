import header from '../../../assets/images/header.png'


export default function Header({ Title , Paragraph }) {
  return (
    <>
      <div className=' header d-flex justify-content-between ps-5 pe-2 mt-4 py-'>

        <div className='caption-header'>
          <h2 className='mt-3'> {Title} </h2>
          <p> {Paragraph} </p>
        </div>

        <div className='img-header'>
          <img className='headerImg' src={header} alt="" />
        </div>

      </div>
    </>
  )
}
