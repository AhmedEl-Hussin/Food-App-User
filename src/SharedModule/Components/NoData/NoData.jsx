import imgNoData from '../../../assets/images/noData.png'


export default function NoData() {
  return (
    
    <>
      <div className="text-center noData mt-5">
          <img className='w-25' src= {imgNoData} alt="" />
          <h5 className='mt-3'>No Data !!!!</h5>
      </div>
    </>
  )
}
