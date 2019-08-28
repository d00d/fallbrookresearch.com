---
layout: post
title: Factor Models & Risk Exposure
feature-img: white1.jpg
author: R Dubnick
comments: true
published: true
---
## Factor Models & Risk Exposure
One of the [first principles](https://en.wikipedia.org/wiki/First_principle "first principles") underlying Financial market dynamics concerns the relationship between Risk & Return.

As investment managers reach for ways to price assets, quantify investment risks, explain performance, and construct portfolios to achieve premiums above market returns, the use of quantitative models have become en vogue.

Factors and [factor-based models](https://www.investopedia.com/terms/m/multifactor-model.asp "Multi-Factor Models") provide some utility in explaining market equilibrium asset prices, decomposing risk and then re-recombine assets with these factors within a portfolio to specifically targeted risk profiles.  Having a scheme to isolate characteristics influenced by economic catalysts has a variety of applications including: risk-management, investment product development, strategic asset allocation, and portfolio construction.

### What are Factors?

Factors can be viewed as the underlying characteristics within stocks and other securities, which to varying degrees,  explain and determine their [risk premium](https://www.investopedia.com/terms/r/riskpremium.asp "risk premium").

There are a wide variety of factors which associate with an asset’s expected returns.   There are _macroeconomic factors_ which capture broad risks across asset classes such as credit, inflation, and liquidity.   There are _style factors_ which look to explain returns and risks within asset classes such as value, quality, and momentum.  Literally hundreds of such factors have been identified and published since researchers [Eugene Fama ](https://www.chicagobooth.edu/faculty/directory/f/eugene-f-fama "Eugene Fama")and [Kenneth French](http://mba.tuck.dartmouth.edu/pages/faculty/ken.french/biography.html "Kenneth French") introduced their classic [three-factor model](https://www.investopedia.com/terms/f/famaandfrenchthreefactormodel.asp "3-factor model"), consisting of market risk, size, and value, in 1993. 

Factors have become a factor in the investment business where industry-aligned benchmark providers like FTSE Russell, MSCI, and S&P Dow Jones have generated volumes of research and indexes supporting an expanding collection of newly-minted factors.  Over the last few years the use of factors has enabled development of smart beta products generating significant new fund flows.  _[smart beta](https://www.investopedia.com/terms/s/smart-beta.asp "Smart Beta")_  and factor investing are just fashionable marketing labels for a wide range of risk-based approaches that sit somewhere beyond active and passive investment management but possess attributes of both.  Applications for factors is common in quantitative finance where quants may rank stocks by using a combination of fundamental factors and price-based factors for use in cross-sectional equity models or various methods of performance attribution.

The evolution of risk measurement and factor-based models can be understood in historical context through the evolution of prior asset models like [CAPM](https://www.investopedia.com/terms/c/capm.asp "CAPM") and the [APT](https://www.investopedia.com/terms/a/apt.asp "APT").

### CAPM’s Uber-Factor

In 1990, Bill Sharpe shared the Nobel Prize in Economics for his contributions on a theory of price formation for financial assets, this is the so-called Capital Asset Pricing Model (CAPM).   This was the first theory to measure systematic risk which, according to the CAPM, depends only upon exposure to the market.

As with many models, CAPM  is a bit of a Faustian bargain in terms of explaining individual stock returns in terms of idiosyncratic / company-specific forces which tend to cancel each other within well-diversified portfolios.   However, CAPM holds that even these diversified portfolios are not ‘risk-free’ given their exposure to a _single_ type of systemic risk known as [market risk](https://www.investopedia.com/terms/m/marketrisk.asp "market risk").

This market risk cannot be diversified away due to the pervasive influence of wider common economic forces.  Further it is the very degree of this exposure that is considered to be the source of expected return.  This market risk explains the variability of an asset's rate of return relative to that of the overall market [^1].

This single-factor market risk is measured by its **beta $ \beta $** [^2] which reflects a [linear relationship](https://www.investopedia.com/terms/l/linearrelationship.asp "Linear Relationship") between an investment’s rate return relative to the market’s rate of return.

CAPM assumes a positive [correlation](https://en.m.wikipedia.org/wiki/Correlation_and_dependence "Correlation") between the amount of market exposure and the degree to which  for return.  In the “efficient” marketplace,  an investor could expect to ramp up the rate of return, by exposing a well-diversified portfolio to higher market risk.   In this scenario the variability of an asset's rate of return is relative to that of the overall market and its “beta” provides a relative measure of systematic (market) risk.

Drinking the CAPM Kool-Aid has meant accepting that price movements are attributed to a single, relatively-simple statistical measure (systemic risk).   This model has been favored by many in academia, perhaps given the tempting simplicity and teach-ability.  However, for all its ivory tower appeal it seems this one trick pony doesn’t fully explain the cross section of stock returns.

Needing a scheme to deal with various relationships looking beyond this single-factor market beta brings us to a _multivariate_ approach as introduced by the [Arbitrage Pricing Theory (APT)](https://www.investopedia.com/terms/a/apt.asp "APT").

### Multi-Factor Arbitrage Pricing Theory (APT)

[Stephen A. Ross](https://en.wikipedia.org/wiki/Stephen_Ross_(economist) "Stephen A. Ross") was one of the first to look beyond “the market factor” while still focusing on systemic risk.  APT is more general than the CAPM, it accepts a variety of different risk sources as it recognizes the interaction of many factors (e.g. inflation, interest rates, business activity, etc.) as contributing to rates of return.  Assets have risk exposures (betas) with respect to each of these systematic risks.  These risk exposures are rewarded in the market with additional expected return, and thus the aggregate risk exposure profile explains volatility and performance of the well-diversified portfolio

Multi-factor model math is slightly more complex but still in a common linear model with an underlying concept more intuitively satisfying.   APT facilitates multi-factor analysis of many broad risk factors and to estimate individual securities' degree of exposure to these factors to explain the so-called “cross-section” of returns at a given point in time.

Models with APT a security effectively has a sensitivity to each systematic risk factor. A series of beta coefficients are estimated to measure the sensitivity to the respective factor risks for a particular security.   Unlike the CAPM, however, the individual factors, although precisely quantified, are not specifically associated with readily identifiable variables.

Factor models offer a useful extension of the CAPM & APT since they help us understand how key factors influence portfolio risk & return.   This affords us an opportunity predict and control investment risk

Factor models extend the framework of existing asset pricing models and allow us to decompose portfolios by constituent factor sensitivities and help us understand attributes that influence portfolio returns.   The mathematical representation of factor models are extensible, linear, and offer a high degree of transparent interpretability which lend them some intuitive appeal.

### Factors & Arbitrage Pricing Theory (APT) relationship
For any given time period ($\bf t$), the difference between realized return $\bf r_i(t)$ and the expected return $\bf Er_i(t)$ for any asset is equal to the sum of all risk factor exposures (e.g. betas  $\bf \beta$) multiplied by the realization (the actual end-of-period value) for that risk factor $\bf \sum\nolimits_{i=1}^k \beta_{i} [P_i+f_i(t)] $ , plus an asset-specific idiosyncratic) error term $\bf \epsilon_i(t)$ .

 $\bf  E[r_i(t)] = P_0 + \sum\nolimits_{i=1}^k \beta_{i}P_i $
$\bf P_i$ is the price of risk, or the risk premium for the  $\bf j^{th} $ risk factor.

**Where:**
-  $\bf r_i(t)$ = the total return on asset i (cap gains + dividends) realized at the end of period  $\bf t$
-   $\bf E[r_i(t)]$ = expected return, at the beginning of period t
- $\bf P_0$ = risk free risk premium
- $\bf P_i$ = price of risk -or- risk premium for the $\bf i^{th}$ risk factor
- $f_i(t)$ = $\bf i^{th}$ risk factor at time $\bf t$.
-  $ \beta_{i}P_i+ f_i $


 $\bf r_i(t) - P_0 = \beta_{i1} [P_1+ f_1(t)] + ... + \beta_{iK} [P_K+f_K(t)] + \epsilon_i(t)$

Beta exposures within a portfolio provide control over associated risk premiums  providing a scheme to manage inherent risk-return trade-offs.   Control the risk exposures and control the risk-return relationship.

### Estimating an APT model:
1. The risk factors f,(t), f,(t), ...,fK(t) can be computed using statistical techniques such as factor analysis or principal components.
2. K different well-diversified portfolios can substitute for the factors (see Appendix B).
3. Economic theory and knowledge of financial markets can be used to specify K risk factors that can be measured from available macroeconomic and financial data.

### Factor Rotation - a nod to mean reversion

The CAPM is clear about the source of risk (the market) but suffers because no practical measure of the market exists. The APT causes difficulties because it does not identify the number of important factors or define them.   The statistical process of factor analysis is employed to quantify the broad risk factors and to estimate individual securities' degree of exposure to these factors.

Financial researchers and investment managers undoubtedly agree that only a few important factors explain an overwhelming degree of investment risk and return. Therefore, the appeal of factor models that define these factors becomes apparent.

Factors can be used to  to avoid large chunks of the market and then build more differentiated portfolios of stocks with only the best overall factor profiles.   While not as scaleable as smart beta, this alpha-oriented approach has led to much better results for investors.

According to a factor model, the return-generating process for a security is driven by the presence of the various common factors and the security's unique sensitivities to each factor (factor loadings). The common factors may be readily identifiable fundamental factors such as price-earnings ratio, size, yield, and growth.

A security effectively has a sensitivity to each systematic risk factor. A series of beta coefficients are estimated to measure the sensitivity to the respective factor risks for a particular security. Unlike the CAPM, however, the individual factors, although precisely quantified, are not specifically associated with readily identifiable variables.

Although considerable discussion continues about the number and the identification of these broad factors, the APT nevertheless provides investment managers with a valuable risk-management tool.

A good portfolio manager, whether explicitly or implicitly, evaluates the impact of a series of broad factors on the performances of various securities. In this sense, a reliable factor model provides a valuable tool to assist portfolio managers with the identification of pervasive factors that affect large members of securities.

Factor models can be used to decompose
portfolio risk according to common factor exposure and to evaluate how much of a portfolio's return was attributable to each common factor exposure. Consequently, factor models offer a useful extension of the CAPM and the APT because they advance our understanding about how key factors influence portfolio risk and return.

Sharpe (1984) effectively summarizes why investment professionals should pay heed to factor models:
> While the relative importance of various actors changes over time, as do the preferences of investors, we need not completely abandon a valuable framework within which we can approach investment decisions methodically. We have developed a useful set of tools and should certainly continue to develop them. Meanwhile, we can use the tools we have, as long as we use them intelligently, cautiously, and humbly.

The objective being select exposures to key factors that represents the best trade-off between risk taken and risk prem expected to be earned. To arrive at this result, we need to answer several questions, such as how to deﬁne the key risk factors driving returns; how to measure and estimate risk and risk premia; how to use these estimates to construct an optimal portfolio of risk exposures.  risk factor decomposition of asset returns, determinants o risk and risk premia, and optimal portfolio choice.

investors to replace optimal  asset allocation with optimal  risk factor allocation— a much more tractable exercise. We can then focus on the optimal allocation of a risk budget to key risk factors rather than directly on a large menu assets in ﬁnancial markets.

Principal components analysis is a statistical methodology useful for extracting the key drivers of a set of variables being studied. It reduces a collection of  N variables (e.g., changes in  riskless yields of N different maturities) to K factors (with K much smaller than  N), where  these factors (or principal components) capture most of the variation in the data. In par - ticular, the ﬁrst principal component (PC1) is a (normalized) linear combination of the  N  variables that has the maximum variance. The second principal component (PC2) is the (n - malized) linear combination of the underlying data that has the maximum variance among  all combinations that are uncorrelated with PC1, and so on. For a formal description, see  Campbell, Lo, and McKinley (1996, ch. 6).

<script type="text/x-mathjax-config">
MathJax.Hub.Config({tex2jax: {inlineMath:[['$','$']]}});
</script>
<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/
MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

[^1]:	Measured by a market index like the S&P 500.

[^2]:	beta $ beta $ is the [covariance](https://en.m.wikipedia.org/wiki/Covariance "Covariance") of the return of an asset with the return of the benchmark, divided by the variance of the return of the benchmark over a certain period.
	 $ \bf \beta = \frac{Covariance (r_i , r_m)}{ Variance (r_m)} $

	It is the coefficient of the independent variable ( $\bf r_m$ - market’s rate of return) in a least squares regression which explains the dependent variable ($\bf r_i$ - a security's rate of return).

	This $ \bf \beta $ measures an asset’s systematic (market - $\bf r_m$ ) risk.   A $\beta $  equal = 1.0 is _on par_ with the overall market, a $ \beta $  \< 1.0 has lower-than-market risk and a $ \beta $  \> 1.0 indicates a greater- than-market risk.

[^3]:	Footnote one
