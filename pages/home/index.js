import {useEffect, useState} from "react";
import {useContext} from "react";
import {CMContext} from "../../context/context";
import CoinCard from "../../components/CoinCard";
import NewsCard from "../../components/NewsCard";
import styled from "styled-components";
import Popup from "../../components/Popup_bookmarked";
import {useGlobalState} from "../../state";
import StyledCard from "../../components/styled/StyledCard";
import StyledBody from "../../components/styled/StyledBody";
import StyledSelect from "../../components/styled/StyledSelect";
import FeatureBackground from "../../components/styled/FeatureBackground";

export default function Home() {
  let [coinNews, setCoinNews] = useState(null);
  let {coinData} = useContext(CMContext);

  const [buttonPopup] = useGlobalState("openPopup");
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await fetch(
          `https://bing-news-search1.p.rapidapi.com/news/search?q="${newsCategory}"`,
          {
            method: "GET",
            headers: {
              "X-BingApis-SDK": "true",
              "X-RapidAPI-Key":
                "b1f05b99c9msh84c7f8928e12780p194411jsn85165cd63758",
              "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
              category: "Cryptocurrency",
            },
          }
        );
        const data = await res.json();

        setCoinNews(data.value);
      } catch (err) {
        console.log(err);
      }
    };
    callAPI();
  }, [newsCategory]);

  function magic(event) {
    const {currentTarget: el, clientX: x, clientY: y} = event;
    const {top: t, left: l, width: w, height: h} = el.getBoundingClientRect();
    el.style.setProperty("--posX", x - l - w / 2);
    el.style.setProperty("--posY", y - t - h / 2);
  }

  return (
    <>
      <Popup trigger={buttonPopup}></Popup>
      <StyledBody>
        <FeatureBackground onPointerMove={magic} active={buttonPopup}>
          <h2>LAST NEWS</h2>
          <h3>News Category:</h3>

          <StyledSelect onChange={e => setNewsCategory(e.target.value)}>
            <option value="cryptocurrency">cryptocurrency</option>
            {coinData
              ? coinData.map((coin, i) => {
                  return (
                    <option key={i} value={coin.name}>
                      {coin.name}
                    </option>
                  );
                })
              : ""}
          </StyledSelect>

          <StyledContainer>
            {coinNews &&
              coinNews.map((news, i) => (
                <div key={i}>
                  <NewsCard
                    urlLink={news.url}
                    name={news.name}
                    url={news?.image?.thumbnail?.contentUrl}
                    description={news.description}
                    datePublished={news.datePublished}
                    providerName={news.provider[0]?.name}
                    providerUrl={news.provider[0]?.image?.thumbnail?.contentUrl}
                  />
                </div>
              ))}
          </StyledContainer>
        </FeatureBackground>
        <FeatureBackground onPointerMove={magic} active={buttonPopup}>
          <h2>TOP-100 CRYPTOCURRENCIES</h2>
          <StyledCard active={buttonPopup} header>
            <StyledP />
            <StyledP>#</StyledP>
            <StyledP>NAME</StyledP>
            <StyledP>PRICE($)</StyledP>
            <StyledP>MARKET CAP($bln.)</StyledP>
            <StyledP>VOLUME(24h)($mln.)</StyledP>
          </StyledCard>

          <StyledTop100>
            {coinData ? (
              coinData.map((coin, i) => (
                <StyledDiv key={i}>
                  <CoinCard
                    id={coin.id}
                    rank={coin.cmc_rank}
                    name={coin.symbol}
                    price={coin.quote.USD.price}
                    market_cap={coin.quote.USD.market_cap}
                    volume={coin.quote.USD.volume_24h}
                  />
                </StyledDiv>
              ))
            ) : (
              <></>
            )}
          </StyledTop100>
        </FeatureBackground>
      </StyledBody>
    </>
  );
}

const StyledDiv = styled.div`
  height: 25px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: scroll;
  margin-top: 25px;
`;

const StyledTop100 = styled.section`
  max-height: 100vh;
  overflow-y: scroll;
  padding-top: 5px;
`;

const StyledP = styled.p`
  word-break: break-all;
  white-space: normal;
  font-size: smaller;
  color: white;
`;
