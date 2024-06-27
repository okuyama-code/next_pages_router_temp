import { GetServerSidePropsContext } from 'next'

export const getServerSideCommonProps = ({
  req,
}: GetServerSidePropsContext) => {
  return {
    props: {
      cookies: req.headers.cookie ?? '',
    },
  }
}
