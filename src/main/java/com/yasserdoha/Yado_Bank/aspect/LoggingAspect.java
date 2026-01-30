package com.yasserdoha.Yado_Bank.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    
    @Before("execution(* com.yasserdoha.Yado_Bank.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        logger.info("Entrée dans la méthode: {} de la classe: {}",
                joinPoint.getSignature().getName(),
                joinPoint.getTarget().getClass().getSimpleName());
    }

    @AfterReturning(pointcut = "execution(* com.yasserdoha.Yado_Bank.service.*.*(..))", returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        logger.info("Sortie de la méthode: {} avec le résultat: {}",
                joinPoint.getSignature().getName(),
                result);
    }
}
