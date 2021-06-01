import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useGeneralSettings } from '@wpengine/headless/react';
import { Footer, Header } from 'components';

const authorsQuery = gql`
  {
    users {
      nodes {
        avatar {
          url
        }
        firstName
        lastName
        roles {
          nodes {
            displayName
          }
        }
      }
    }
  }
`;

const AuthorsPage = () => {
  const settings = useGeneralSettings();
  const { data } = useQuery(authorsQuery);
  const authors = data?.users?.nodes ?? [];

  return (
    <>
      <Header title={settings?.title} description={settings?.description} />
      <div className="wrap">
        <ol>
          {authors.map((author: any) => (
            <li>
              <img src={author.avatar.url} alt=""></img>
              <p>
                {author.firstName} {author.lastName}
              </p>
            </li>
          ))}
        </ol>
      </div>
      <Footer copyrightHolder={settings?.title} />
    </>
  );
};

export default AuthorsPage;
