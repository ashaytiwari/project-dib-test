import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import FormControl from '../formControl/FormControl';
import { getApplicationStorage } from '../../../utilities/storage';
import { applyForBid } from '../../../services/userService';
import toast from 'react-hot-toast';

function ProjectBidModal(props) {

  const { project, onClose } = props;

  const [bidAmount, setBidAmount] = useState('');

  const userDetails = getApplicationStorage();

  async function submitBid() {

    const params = {
      projectId: project._id,
      userId: userDetails._id,
      userName: userDetails.name,
      email: userDetails.email,
      bidAmount
    };

    const response = await applyForBid(params);

    if (response.data?.statusCode === 200) {
      onClose();
      toast.success('Bid submitted successfully');
    } else {
      toast.error(response.data?.message);
    }

  }

  const modalAttributes = {
    show: true,
    onHide: onClose
  };

  const amountControlAttributes = {
    label: 'Enter Bid amount',
    placeholder: 'Enter Bid amount',
    type: 'number',
    name: 'bidAmount',
    value: bidAmount,
    onChange(name, value) {
      setBidAmount(value);
    }
  };

  return (
    <Modal {...modalAttributes}>

      <Modal.Header closeButton>
        <Modal.Title>{project.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <label className='mb-3'>Apply some bid amount to project.</label>
        <FormControl {...amountControlAttributes} />
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={submitBid}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );

}

export default ProjectBidModal;