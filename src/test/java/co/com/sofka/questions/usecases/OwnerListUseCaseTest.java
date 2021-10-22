
package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Flux;

import java.util.Arrays;

@SpringBootTest
class OwnerListUseCaseTest {

    @MockBean
    QuestionRepository questionRepository;

    @SpyBean
    OwnerListUseCase ownerListUseCase;

    @Test
    @DisplayName("List question owner")
    void ownerListTest(){
        var questionDTO = new QuestionDTO("111","xxx","is testing necessary?","CLOSED",
                "DEVELOPMENT",2,3, Arrays.asList("x1", "x2"),  "test@test.com");
        var question = new Question();
        question.setId("111");
        question.setUserId("xxx");
        question.setQuestion("is testing necessary?");
        question.setCategory("DEVELOPMENT");
        question.setType("test@test.com");


        Mockito.when(questionRepository.findByUserId(questionDTO.getUserId())).thenReturn(Flux.just(question));

        var resultQuestionDTO =  ownerListUseCase.apply(questionDTO.getUserId()).collectList().block();

        assert resultQuestionDTO != null;
        Assertions.assertEquals(resultQuestionDTO.get(0).getId(), question.getId());
        Assertions.assertEquals(resultQuestionDTO.get(0).getUserId(), question.getUserId());
        Assertions.assertEquals(resultQuestionDTO.get(0).getQuestion(), question.getQuestion());
        Assertions.assertEquals(resultQuestionDTO.get(0).getType(), question.getType());
        Assertions.assertEquals(resultQuestionDTO.get(0).getCategory(), question.getCategory());
    }
}