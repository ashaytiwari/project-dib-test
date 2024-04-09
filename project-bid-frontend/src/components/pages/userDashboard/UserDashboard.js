import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { clearApplicationStorage, getApplicationStorage } from '../../../utilities/storage';

import styles from './UserDashboard.module.scss';
import { getProjects } from '../../../services/commonService';
import toast from 'react-hot-toast';
import Spinner from '../../generics/spinner/Spinner';
import ProjectCard from '../../generics/projectCard/ProjectCard';
import userRoles from '../../../constants/userRoles';
import { Button } from 'react-bootstrap';

function UserDashboard() {

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function checkIsAdmin() {
    const isAdmin = userDetails.role === userRoles.admin;
    return isAdmin;
  }

  const userDetails = getApplicationStorage();

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setIsLoading(true);

    const response = await getProjects();

    if (response.data?.statusCode === 200) {
      setProjects(response.data?.data);
    } else {
      toast.error(response.data?.message);
    }

    setIsLoading(false);

  }

  function renderHeader() {

    const logoutControlAttributes = {
      className: 'btn btn-danger',
      onClick() {
        clearApplicationStorage();
        navigate('/');
      }
    };

    return (
      <div className={styles.header}>
        <h3>Project Bid App</h3>
        <button {...logoutControlAttributes}>Logout</button>
      </div>
    );
  }

  function renderProjectCard(project, index) {

    const cardAttributes = {
      project,
      key: index,
      isUser: checkIsAdmin() === true ? false : true,
      onStatusUpdate() {
        fetchProjects();
      }
    };

    return <ProjectCard {...cardAttributes} />;
  }

  function renderAdminLabel() {

    if (checkIsAdmin() === false) {
      return;
    }

    return (
      <span>(Admin)</span>
    );

  }

  function renderAddProjectsControl() {

    if (checkIsAdmin() === false) {
      return;
    }

    return <Button>Add project</Button>
  }

  function renderSubHeader() {

    return (
      <div className={styles.subHeader}>
        <h3>Hello {userDetails?.name} {renderAdminLabel()}</h3>
        {renderAddProjectsControl()}
      </div>
    );
  }

  function renderDashboardContent() {

    if (isLoading === true) {
      return <Spinner />;
    }

    const _projects = projects.filter((item) => {

      if (checkIsAdmin() === true) {
        return true;
      }

      if (item.active === true) {
        return true;
      }

      return false;
    });

    return (
      <div className={styles.content}>
        {renderSubHeader()}
        <div className='row'>
          {
            _projects?.map((project, index) => (
              renderProjectCard(project, index)
            ))
          }
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return <Navigate to='/' />;
  }

  return (
    <div id={styles.userDashboardMain}>
      {renderHeader()}
      {renderDashboardContent()}
    </div>
  );

}

export default UserDashboard;