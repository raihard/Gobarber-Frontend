import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import { Container, Repositories } from './styles';
import rocketseat_logo from '../../assets/rocketseat-logo.svg';
interface Params {
  repository: string;
}

interface Repos {
  id: string;
  full_name: string;
  description: string;
  forks: number;
  open_issues: number;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issues {
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<Params>();

  const [repo, setRepository] = useState<Repos | null>(null);
  const [issues, setIssues] = useState<Issues[]>([]);

  // const [repo, setRepositores] = useState<Repos>(() => {
  //   const storegeRepositores = localStorage.getItem(
  //     '@GithabExplore:repositores',
  //   );
  //   if (storegeRepositores) {
  //     const Arrayepositores = JSON.parse(storegeRepositores);
  //     return Arrayepositores[3];
  //   }
  //   return [];
  // });

  useEffect(() => {
    api
      .get<Repos>(`/repos/${params.repository}`)
      .then(response => setRepository(response.data));
    api
      .get<Issues[]>(`/repos/${params.repository}/issues`)
      .then(response => setIssues(response.data));
  }, [params.repository]);

  return (
    <Container>
      <header>
        <img src={rocketseat_logo} alt="" />
        <Link to="/">
          <FiChevronLeft size={20} />
          Voltar
        </Link>
      </header>

      <div className="repositoryInfo">
        {repo && (
          <>
            <div>
              <img src={repo.owner.avatar_url} alt={repo.owner.login} />
              <div>
                <strong>{repo.full_name}</strong>
                <p>{repo.description}</p>
              </div>
            </div>
            <ul>
              <li>
                <strong>{repo.stargazers_count}</strong>
                <span>Stars</span>
              </li>
              <li>
                <strong>{repo.forks}</strong>
                <span>Forks</span>
              </li>
              <li>
                <strong>{repo.open_issues}</strong>
                <span>Issues Abertas</span>
              </li>
            </ul>
          </>
        )}
      </div>

      <Repositories>
        {issues.map((issue: Issues) => (
          <a key={issue.user.login} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </Container>
  );
};

export default Repository;
