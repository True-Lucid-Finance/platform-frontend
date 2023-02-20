import classNames from 'classnames'
import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'

import Container from '@/components/Container'
import GradientBlock from '@/components/GradientBlock'
import GradientText from '@/components/GradientText'
import { H1, H2, H3 } from '@/components/Headings'
import Layout from '@/components/Layout'
import { defaultLocales, gradientTextClassnames } from '@/constants'

// images
import backedByAppWorks from '@public/img/homepage/backedBy.appWorks.png'
import backedByBtcStartupLab from '@public/img/homepage/backedBy.btcStartupLab.png'
import backedByWaterdripCapital from '@public/img/homepage/backedBy.waterdripCapital.png'
import memberAidan from '@public/img/homepage/member.Aidan.png'
import memberAndy from '@public/img/homepage/member.Andy.png'
import memberKurt from '@public/img/homepage/member.Kurt.png'
import memberShawn from '@public/img/homepage/member.Shawn.png'
import memberWade from '@public/img/homepage/member.Wade.png'

const Home: NextPage = () => {
  const [emailAddress, setEmailAddress] = useState<string>('')
  const [subscribed, setSubscribed] = useState<boolean>(false)
  const { t } = useTranslation(['homepage'])

  const sendEmail = async () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!subscribed && emailAddress && re.test(emailAddress)) {
      setSubscribed(true)
      const uri = 'https://api.getwaitlist.com/api/v1/waiter'

      fetch(uri, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailAddress,
          api_key: 'MJOVSE',
        }),
      })
        .then((res) => {
          if (res.status != 200) {
            setSubscribed(false)
            return
          }

          setEmailAddress('')
          setSubscribed(true)
        })
        .catch((err) => {
          console.error(err)
          setSubscribed(false)
        })
    }
  }

  return (
    <Layout>
      <div className="-mt-32 flex flex-col w-full">
        <Container className="pt-32 grow">
          <section className="h-full relative md:grid md:grid-cols-5 items-center py-8">
            <div className="col-span-3 relative">
              <div>
                <H1 className="mt-2 md:max-w-[30rem] text-center md:text-left sm:leading-[3rem]">
                  <Trans i18nKey="main.slogan" ns="homepage"></Trans>
                </H1>

                <div className="mt-2 md:mt-6 flex justify-center md:justify-start">
                  <div className="inline-flex">
                    <input
                      type="email"
                      className={classNames(
                        'form-input md:w-64 lg:w-72 px-3 py-2 rounded-lg border-gray-300 bg-white',
                        subscribed ? 'cursor-not-allowed' : ''
                      )}
                      placeholder={
                        subscribed
                          ? `${t('subscribed', { ns: 'common' })} 🎉`
                          : t('example.email', { ns: 'common' })
                      }
                      disabled={subscribed}
                      autoComplete="off"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                    />
                    <button
                      type="button"
                      className="ml-2 px-3 py-1 rounded-lg bg-sefo-purple-300 text-lg font-bold text-white select-none cursor-pointer disabled:cursor-not-allowed"
                      disabled={subscribed}
                      onClick={sendEmail}
                    >
                      {t('joinWaitlist')}
                    </button>
                  </div>
                </div>
              </div>

              <div className="absolute -top-12 -left-12 w-44 h-44 bg-blue-radial"></div>
            </div>

            <div className="hidden md:block col-span-2">
              <div className="relative h-full"></div>
            </div>
          </section>
        </Container>
      </div>

      <section className="my-16">
        <Container>
          <H2 className="text-center">
            <Trans i18nKey="intro.title" ns="homepage">
              <span>
                <GradientText />
              </span>
            </Trans>
          </H2>

          <div className="grid grid-cols-5 gap-4 py-8 sm:py-12">
            <div className="col-span-2">
              <GradientBlock className="h-full px-4 bg-blend-hue">
                <div className="flex">
                  <H3 className={gradientTextClassnames}>
                    <Trans
                      i18nKey="intro.solution1.title"
                      ns="homepage"
                    ></Trans>
                  </H3>
                </div>

                <p className="mt-3">{t('intro.solution1.description')}</p>
              </GradientBlock>
            </div>

            <div className="col-span-3">
              <div className="flex flex-col gap-2">
                <GradientBlock className="px-4 bg-blend-hue">
                  <div className="flex">
                    <H3 className={gradientTextClassnames}>
                      <Trans
                        i18nKey="intro.solution2.title"
                        ns="homepage"
                      ></Trans>
                    </H3>
                  </div>

                  <p className="mt-3">{t('intro.solution2.description')}</p>
                </GradientBlock>

                <GradientBlock className="px-4 bg-blend-hue">
                  <div className="flex">
                    <H3 className={gradientTextClassnames}>
                      <Trans
                        i18nKey="intro.solution3.title"
                        ns="homepage"
                      ></Trans>
                    </H3>
                  </div>

                  <p className="mt-3">{t('intro.solution3.description')}</p>
                </GradientBlock>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="my-16">
        <Container>
          <H2>{t('mechanism.title')}</H2>

          <div className="grid grid-cols-2 gap-4 py-8 sm:py-12">
            <div className="rounded-[2rem]"></div>

            <div className="flex flex-col gap-4">
              <div>
                <H3 className={gradientTextClassnames}>
                  <Trans i18nKey="mechanism.step1.title" ns="homepage"></Trans>
                </H3>
                <p className="mt-2">{t('mechanism.step1.description')}</p>
              </div>

              <div>
                <H3 className={gradientTextClassnames}>
                  <Trans i18nKey="mechanism.step2.title" ns="homepage"></Trans>
                </H3>
                <p className="mt-2">{t('mechanism.step2.description')}</p>
              </div>

              <div>
                <H3 className={gradientTextClassnames}>
                  <Trans i18nKey="mechanism.step3.title" ns="homepage"></Trans>
                </H3>
                <p className="mt-2">{t('mechanism.step3.description')}</p>
              </div>

              <div>
                <H3 className={gradientTextClassnames}>
                  <Trans i18nKey="mechanism.step4.title" ns="homepage"></Trans>
                </H3>
                <p className="mt-2">{t('mechanism.step4.description')}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="my-16">
        <Container>
          <H2 className="text-center">{t('team.title')}</H2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-8 xs:py-16 sm:py-24 px-8 xs:px-20 sm:px-0 gap-4 sm:gap-8 text-center">
            <GradientBlock className="flex flex-col pb-4">
              <div>
                <Image src={memberAidan} layout="intrinsic" />
              </div>
              <H3>
                <GradientText>{t('team.aidan.name')}</GradientText>
              </H3>
              <p className="text-sm font-bold">{t('team.aidan.title')}</p>
            </GradientBlock>

            <GradientBlock className="flex flex-col pb-4">
              <div>
                <Image src={memberWade} layout="intrinsic" />
              </div>
              <H3>
                <GradientText>{t('team.wade.name')}</GradientText>
              </H3>
              <p className="text-sm font-bold">{t('team.wade.title')}</p>
            </GradientBlock>

            <GradientBlock className="flex flex-col pb-4">
              <div>
                <Image src={memberAndy} layout="intrinsic" />
              </div>
              <H3>
                <GradientText>{t('team.andy.name')}</GradientText>
              </H3>
              <p className="text-sm font-bold">{t('team.andy.title')}</p>
            </GradientBlock>

            <GradientBlock className="flex flex-col pb-4">
              <div>
                <Image src={memberKurt} layout="intrinsic" />
              </div>
              <H3>
                <GradientText>{t('team.kurt.name')}</GradientText>
              </H3>
              <p className="text-sm font-bold">{t('team.kurt.title')}</p>
            </GradientBlock>

            <GradientBlock className="flex flex-col pb-4">
              <div>
                <Image src={memberShawn} layout="intrinsic" />
              </div>
              <H3>
                <GradientText>{t('team.shawn.name')}</GradientText>
              </H3>
              <p className="text-sm font-bold">{t('team.shawn.title')}</p>
            </GradientBlock>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <H2 className="text-center">{t('backedBy.title')}</H2>

          <div className="grid grid-cols-1 sm:grid-cols-3 py-8 xs:py-16 sm:py-24 px-8 xs:px-20 sm:px-0 gap-4 xs:gap-6 sm:gap-12">
            <div className="flex justify-center items-center">
              <Image
                src={backedByBtcStartupLab}
                layout="intrinsic"
                alt={t('backedBy.btcStartupLab.name')}
              />
            </div>

            <div className="flex justify-center items-center">
              <Image
                src={backedByAppWorks}
                layout="intrinsic"
                alt={t('backedBy.appWorks.name')}
              />
            </div>

            <div className="flex justify-center items-center">
              <Image
                src={backedByWaterdripCapital}
                layout="intrinsic"
                alt={t('backedBy.waterdripCapital.name')}
              />
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale = '' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        ...defaultLocales,
        'homepage',
      ])),
    },
  }
}

export default Home
