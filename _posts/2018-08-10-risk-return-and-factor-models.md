---
layout: post 
title: Risk, Return, and Factor Models Strategies
feature-img: white1.jpg
author: R Dubnick
comments: true
published: true
---
## Factors & Risk Exposure

Among mental models for Finance, a first principal is concerned with the relationship between Risk & Return.   As financial managers have sought methods to price assets, quantify risk, explain performance, and achieve premiums beyond market returns some have turned toward factor-based investing strategies.

What are Factors?   They are characteristics of stocks and other securities which drive performance to some degree and provide risk premium.   Use of factors can provide a strategic framework for asset allocation and defining systemic investment rules.    I think the evolution of factor models can be understood through the lens of CAPM and APT.

### CAPM’s Uber-Factor

In 1990, Bill Sharpe shared the Nobel Prize in Economics for his contributions on a theory of price formation for financial assets, this is the so-called capital asset pricing model (CAPM).   As with models, CAPM  is a bit of a faustian bargain explaining stock price movement in terms of it’s beta.  

According to the CAPM, systematic risk depends only upon exposure to the overall market, usually proxied by a broad stock market index, such as the S&P 500.  In CAPM this risk exposure can be measured by beta.    

> Technically, beta is the covariance of the return of an asset with the return of the benchmark divided by the variance of the return of the benchmark over a certain period.
> 
> $ \beta = \frac{Covariance (r_i , r_m)}{ Variance (r_m)} $ 

CAPM assumes a positive correlation between the amount of risk and potential for return.    In the “efficient” marketplace higher returns are generally achieved by accepting greater risks (e.g. exposure to the market).     

The general idea there was that only by exposing a well-diversified portfolio to higher market risk could an investor expect to achieve a higher rate of return. Under CAPM, the variability of an asset's rate of return is relative to that of the overall market and its “beta” provides a relative measure of systematic (market) risk.  

Drinking the CAPM Kool-Aid means accepting that all expected price movements can be attributed to a single (relatively simple) statistical measure.   CAPM may have been favored by many in academia given its tempting simple elegance and teach-ability, but for all its ivory tower appeal  we find more dimensionality is at play than this one-trick pony can provide.   Moving beyond single-factor beta risk,  researchers have since observed many other factors contributing to risk/return profiles. 

We need a scheme to deal with those relationships.

The factor approach has roots in what is deemed the arbitrage pricing theory (APT) Researchers seek to identify a set of factors (e.g., value, momentum, size, market, quality, low-vol, and so forth) that explain the so-called “cross-section” of returns, or the distribution of returns at a given point in time.

Taking this aside we’d still want  specifically quantify and allocate said risk.   


 



Later Stephen A. Ross presented the arbitrage pricing theory (APT) which recognizes that several different broad risk sources may combine to influence an asset’s risk/return.   APT recognizes the interaction of many factors (e.g. inflation, interest rates, business activity, etc.) as contributing to rates of return.  Here factor analysis is employed to quantify the broad risk factors and to estimate individual securities' degree of exposure to these factors. 

With APT a security effectively has a sensitivity to each systematic risk factor. A series of beta coefficients are estimated to measure the sensitivity to the respective factor risks for a particular security.   Unlike the CAPM, however, the individual factors, although precisely quantified, are not specifically associated with readily identifiable variables. 

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





<script type="text/x-mathjax-config">
MathJax.Hub.Config({tex2jax: {inlineMath:[['$','$']]}});
</script>
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/
MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>