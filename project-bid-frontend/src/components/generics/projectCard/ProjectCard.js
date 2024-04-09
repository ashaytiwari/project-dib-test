import React, { useState } from 'react';

import { Button, Card } from 'react-bootstrap';

import styles from './ProjectCard.module.scss';
import ProjectBidModal from './ProjectBidModal';
import { updateProjectStatus } from '../../../services/adminService';
import toast from 'react-hot-toast';

function ProjectCard(props) {

  const { isUser, project, onStatusUpdate } = props;

  const [showBidModal, setShowBidModal] = useState(false);

  async function handleStatusChange() {

    const params = {
      projectId: project._id,
      status: project.active === true ? false : true
    };

    const response = await updateProjectStatus(params);

    if (response.data?.statusCode === 200) {
      toast.success('Project status updated successfully!');
      onStatusUpdate();
    } else {
      toast.error(response.data?.message);
    }

  }

  function renderCardControl() {

    if (isUser === true) {
      return <Button onClick={() => setShowBidModal(true)}>Bid</Button>;
    }

    let projectStatus = project.active === true ? 'Make Inactive' : 'Make Active';

    return <Button onClick={handleStatusChange}>{projectStatus}</Button>;

  }

  function renderBidModal() {

    if (showBidModal === false) {
      return;
    }

    const modalAttributes = {
      project,
      onClose() {
        setShowBidModal(false);
      }
    };

    return <ProjectBidModal {...modalAttributes} />;
  }

  return (
    <div className='col-md-4'>
      <Card>
        <Card.Body>
          <Card.Title>{project.name}</Card.Title>
          <Card.Text>{project.expiryDate}</Card.Text>
          {renderCardControl()}
        </Card.Body>
      </Card>
      {renderBidModal()}
    </div>
  );

}

export default ProjectCard;