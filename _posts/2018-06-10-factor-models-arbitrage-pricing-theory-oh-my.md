---
layout: post 
title: Risk, Arbitrage Pricing Theory, & Factor Models
feature-img: white1.jpg
author: R. Dubnick
comments: true
published: true
---
### Factor Models can provide a framework to segregate and manage risks
One of the most widely accepted financial principles is the tradeoff between risk and return.    Its generally held that In an efficient marketplace, higher returns are achieved by accepting greater risks.     

Since we’d like to be able to manage those risks, divide them up, hedge them and even use it when needed.   As the old adage says “if you can't measure it, you can't manage it”.    Factor Models can provide a framework for doing this. Factor models can be understood through the lens of CAPM and APT.

Bill Sharpe shared the 1990 Nobel Memorial Prize in Economic Sciences for the capital asset pricing model (CAPM) which postulates that a single type of risk, known as market risk, affects expected security returns.   The general idea there was that only by exposing a well-diversified portfolio to higher market risk could an investor expect to achieve a higher rate of return. Under CAPM, the variability of an asset's rate of return is relative to that of the overall market. Its “Beta” provides a relative measure of systematic (market) risk.  

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
