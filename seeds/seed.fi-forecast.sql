-- TRUNCATE all tables to ensure that there are no
-- data in them so we start with a fresh set of data
TRUNCATE forecasts, cards RESTART IDENTITY CASCADE;

-- insert 1 example forecast
INSERT INTO forecasts
  (current_age, net_income, income_increase, current_spending, current_savings, future_spending, input_roi, input_withdrawal_rate)
  VALUES
    ('30', '65000', '4', '49000', '52700', '40000', '8', '4');

-- insert 8 cards
INSERT INTO cards
  (title, content, icon)
  VALUES
    ('How old will I be when I reach financial independence?', 'According to the U.S. Census Bureau, the average retirement age in the United States is 65 for men and 63 for women. Many factors, including health, cost of living, and economics play a role on retirement. However, by simply spending less and saving more, you can reduce this number by years and even decades.', 'cake'),
    ('What year would I be able to retire?', 'For many people, retirement is something we expect to happen far into the future. But with compound interest, small changes today can make this a reality sooner than you might think.', 'event'),
    ('Where am I in my journey?', 'This is the percentage of your existing net worth compared to how much you will need in retirement. Whether you''re far along or just getting started, the important thing is that you''re on your way!', 'data_usage'),
    ('How much will I need in retirement?', 'This is the total amount you''ll need in order to live comfortably post-retirement, based on your estimated future spending and a recommended withdrawal rate of 4%. This number should last you at least 30 years.', 'account_balance'),
    ('How much money do I save each month?', 'After taxes and monthly spending, this is the amount of money you''re putting away each month. Keep in mind that discretionary expenses like food and drinks, subscriptions, and online purchases chip away at this number and impact your net worth over time.', 'savings'),
    ('How much of my income am I saving?', 'Your savings rate is the percentage of income that''s going into savings or investments. This number is a great benchmark to keep an eye on and try to increase when possible.', 'thumb_up'),
    ('If I retired today, how much would I be able to spend per year?', 'If you quit your job and tried to live off your savings, this is how much you could withdraw per year without new income. In some countries, you can live on as low as $7,000/year USD.', 'payments'),
    ('If I retired today, how much would I be able to spend per month?', 'If you quit your job and tried to live off your savings, this is how much you could withdraw per month without new income. Compare this against how much you spend today—could be quite the challenge!', 'paid');