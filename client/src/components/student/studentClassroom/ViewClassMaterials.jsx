import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Backend_url } from '../../../../Backend_url';

const ViewClassMaterials = ({ material,classId }) => {
  const navigate = useNavigate();
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isPDFPreviewOpen, setIsPDFPreviewOpen] = useState(false);
  const [isVideoPreviewOpen, setIsVideoPreviewOpen] = useState(false);

  const handleOpenMaterialClick = (material) => {
    setSelectedMaterial(material);
    if (material.type === 'Image' || material.type === 'Pdf') {
      setIsPDFPreviewOpen(true);
    } else if (material.type === 'Video') {
      setIsVideoPreviewOpen(true);
    }
  };

  const handleClosePDFPreview = () => {
    setIsPDFPreviewOpen(false);
    setSelectedMaterial(null);
  };

  const handleCloseVideoPreview = () => {
    setIsVideoPreviewOpen(false);
    setSelectedMaterial(null);
  };


  return (
<div className='w-5/6 '>
  {material?.map((material) => (
    <div key={material._id} className="cursor-pointer 
               bg-cyan-50  hover:scale-105 duration-200 
                 shadow-md rounded-lg p-8 mb-10 mt-10 mx-10">
      <h2 className="text-xl text-cyan-900 font-semibold mb-2">{material.name}</h2>
      <p className="text-cyan-800 text-lg font-semibold mb-4">{material.description}</p>
      <p className="font-medium text-cyan-700 mb-2">File Type: {material.type}</p>
      <p className="font-medium text-cyan-700 mb-2">Uploaded on: {new Date(material.createdAt).toLocaleString()}</p>
      <div className="flex justify-between">
        <button onClick={() => handleOpenMaterialClick(material)} className="bg-cyan-600 hover:bg-cyan-800 text-cyan-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Open Material
        </button>
        <button className="bg-cyan-600 hover:bg-cyan-800 text-cyan-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={()=>navigate(`/Student-Classroom/${classId}/Comments/${material._id}`)}>
              Comments
        </button>
        <button className="bg-green-600 hover:bg-green-800 text-cyan-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={()=>navigate(`/Student-Classroom/${classId}/FeedBack-Material/${material._id}`)}>
              Give Feedback
        </button>
      </div>
    </div>
  ))}
  {isPDFPreviewOpen && (
    <div className="fixed top-0 left-0 w-full h-full bg-cyan-950 bg-opacity-75 flex justify-center items-center">
      <div className="bg-cyan-100 rounded-lg p-4">
        <h2>Preview</h2>
        {selectedMaterial.type === 'Pdf' ? (
          <iframe src={selectedMaterial.file} style={{ width: "100%", height: "400px" }} title="PDF Preview" />
        ) : (
          <img src={selectedMaterial.file} style={{ width: "auto", height: "400px" }} title="Image Preview" />
        )}
        <div className="flex justify-between mt-4">
          <button onClick={handleClosePDFPreview} className="p-2 rounded-md text-white bg-red-500">
            Close
          </button>
          <a href={selectedMaterial.file} target='_blank' download className="p-2 rounded-md text-white bg-cyan-700">
            Download
          </a>
        </div>
      </div>
    </div>
  )}
  {isVideoPreviewOpen && (
    <div className="fixed top-0 left-0 w-full h-full bg-cyan-50 bg-opacity-75 flex justify-center items-center">
      <div className="bg-cyan-100 rounded-lg  p-4">
        <h2 className="text-xl text-cyan-950">Video Preview</h2>
        <video controls style={{ width: "600px", height: "400px" }} src={selectedMaterial.file} type="video/mp4"></video>
        <button onClick={handleCloseVideoPreview} className='p-2 m-5 rounded-md text-cyan-50 bg-red-500'>Close</button>
      </div>
    </div>
  )}
</div>

  );
};

export default ViewClassMaterials;
